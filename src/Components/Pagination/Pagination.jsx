import { useEffect, useState } from "react";
import PostList from "../PostList/PostList";
import './Pagination.css'

export default function Pagination({ data }) {
    const [page, setPage] = useState(1)
    const [postsToShow, setPostsToShow] = useState([])
    console.log(data);
    const limit = 50
    const totalNumberOfPosts = data.length
    const amountOfPages = Math.ceil(totalNumberOfPosts / limit)
    console.log(amountOfPages);
    const firstPostIndex = page * 50 - 50

    function handleBack() {
        if (page > 1) {
            setPage((prev) => prev - 1)
        } else {
            console.log("All");
        }
    }
    function handleForward() {
        if (page < amountOfPages) {
            setPage((prev) => prev + 1)
        } else {
            console.log("All");
        }
    }

    useEffect(() => {
        const toShow = data.slice(firstPostIndex, firstPostIndex + limit)
        setPostsToShow(toShow)
    }, [data, page])

    return (
        <div className="pagination">
            <PostList data={postsToShow} />
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