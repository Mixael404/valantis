import { useEffect, useState } from "react";
import PostList from "../PostList/PostList";
import './Pagination.css'

export default function Pagination({ data, isLoading, currentPage, setCurrentPage }) {
    const [page, setPage] = useState(1)
    const [postsToShow, setPostsToShow] = useState([])
    const limit = 50
    const totalNumberOfPosts = data.length
    const amountOfPages = Math.ceil(totalNumberOfPosts / limit)
    const firstPostIndex = page * 50 - 50

    console.log(data);
    console.log(typeof data[0]);
    function handleBack() {
        if (currentPage > 1) {
            setPage((prev) => prev - 1)
            setCurrentPage((prev) => prev - 1)
        } else {
            alert('All!')
        }
    }
    function handleForward() {
        if (currentPage < amountOfPages) {
            setPage((prev) => prev + 1)
            setCurrentPage((prev) => prev + 1)
        } else {
            alert('All!')
        }
    }

    useEffect(() => {
        const toShow = data.slice(firstPostIndex, firstPostIndex + limit)
        setPostsToShow(toShow)
    }, [data, page, firstPostIndex])

    return (
        <div className="pagination">
            <PostList data={postsToShow} isLoading={isLoading} />
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
                    className={page === amountOfPages ? 'forward disabled' : 'forward'}
                    onClick={handleForward}
                >
                    {'>'}
                </span>
            </div>
        </div>
    )
}