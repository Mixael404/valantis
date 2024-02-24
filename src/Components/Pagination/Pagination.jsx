import { useState } from "react";
import PostList from "../PostList/PostList";

export default function Pagination({data = []}){
    const [page, setPage] = useState(1)
    console.log(data);
    const limit = 50
    const totalNumberOfPosts = data.length
    const amountOfPages = Math.ceil(totalNumberOfPosts/limit)
    console.log(amountOfPages);
    const firstPostIndex = page * 50 - 50
    const postsToShow = data.slice(firstPostIndex, firstPostIndex + 50)
    console.log(postsToShow);

    return(
        <div className="pagination">
            <PostList data={postsToShow} />
        </div>
    )
}