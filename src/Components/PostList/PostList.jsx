import { useEffect, useState } from "react"
import PostItem from "../PostItem/PostItem"
import { getItems } from '../../api'
import Preloader from "../Preloader"

export default function PostList({ data }) {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log("INCOME DATA IN PROPS");
    console.log(data);

    useEffect(() => {
        getItems(data)
            .then((res) => {
                setPosts(res)
                setIsLoading(false)
                console.log(res);
            })
    }, [data])

    return (
        <ol>
            {   isLoading ?
                <Preloader/> :
                posts.map((post) => <li key={post.id}> <PostItem {...post} /></li>)
            }
        </ol>
    )
}