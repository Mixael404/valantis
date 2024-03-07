import { useEffect, useState } from "react";
import PostList from "../PostList/PostList";
import { getItems } from "../../api";
import './Pagination.css'
import Preloader from "../Preloader";

export default function Pagination({ data }) {
    const [page, setPage] = useState(1)
    const [downloadedPosts, setDownloadedPosts] = useState([])
    const [postsToShow, setPostsToShow] = useState([])

    // Чтобы не отправлять новый запрос в случае, если включил страницу, на которой необходимо подкачать данные, быстро перешёл на другую и обратно, пока посты ещё не подкачались
    const [isLoading, setIsLoading] = useState(false)

    // Чтобы отображать стрелку неработающей и прерывать переход по страницам, пока посты не подгрузились
    const [isLastDownloadedPage, setIsLastDownloadedPage] = useState(true)

    const limit = 50
    const totalNumberOfPosts = data.length
    const amountOfPages = Math.ceil(totalNumberOfPosts / limit)
    const firstPostIndex = (page - 1) * limit


    function handleBack() {
        if (page > 1) {
            setPage((prev) => prev - 1)
            setIsLastDownloadedPage(false)
        }
    }

    function handleForward() {
        if (page < amountOfPages && !isLastDownloadedPage) {
            setPage((prev) => prev + 1)
        }
    }

    useEffect(() => {
        const firstPosts = data.slice(0, 100)
        getItems(firstPosts)
            .then((data) => {
                setDownloadedPosts(data)
                setIsLastDownloadedPage(false)
            })
    }, [])


    useEffect(() => {
        const toShow = downloadedPosts.slice(firstPostIndex, firstPostIndex + limit)
        setPostsToShow(toShow)
        
        const lastDownloadedPage = Math.ceil(downloadedPosts.length / 50)

        if(page > lastDownloadedPage){
            setIsLastDownloadedPage(true)
        }
        
        if(page === lastDownloadedPage - 1 && page !== (amountOfPages - 1) && !isLoading){ 
            setIsLoading(true)
            console.warn("Need to download more");
            const firstIndex = (page + 1) * limit
            const ids = data.slice(firstIndex, firstIndex + limit * 2 )
            getItems(ids)
                .then((posts) => {
                    setDownloadedPosts((prev) => [...prev, ...posts])
                    setIsLastDownloadedPage(false)
                    setIsLoading(false)
                })
        }
    }, [data, page, firstPostIndex, downloadedPosts])


    return (
        <div className="pagination">
            {
                isLastDownloadedPage ? <Preloader /> : <PostList data={postsToShow} />
            }
            <div className="controls">
                <span
                    className={page === 1 ? 'back disabled' : 'back'}
                    onClick={handleBack}
                >
                    {'<'}
                </span>
                <span
                    className="pageNumber"
                >
                    {page}
                </span>
                <span
                    className={((page === amountOfPages) || isLastDownloadedPage) ? 'forward disabled' : 'forward'}
                    onClick={handleForward}
                >
                    {'>'}
                </span>
            </div>
        </div>
    )
}