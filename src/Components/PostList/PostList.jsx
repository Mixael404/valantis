import { useEffect, useState } from "react"
import PostItem from "../PostItem/PostItem"
import { getItems } from '../../api'
import Preloader from "../Preloader"

export default function PostList({ data, isLoading }) {
    const [posts, setPosts] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(typeof data[0] === "string"){
            // setIsLoading(true)
            getItems(data)
                .then((res) => {
                    console.log(res);
                    // Добавил проверку на то, что что-то есть в ответе от сервера.
                    if(res.length){
                        setPosts(res)
                        // setIsLoading(false)
                    }
                })
        }
    }, [data])

    return (
        <ol>
            {   isLoading ?
                <Preloader/> :(
                    posts.length ? posts.map((post) => <li key={post.id}> <PostItem {...post} /></li>)
                    : data.map((post) => <li key={post.id}> <PostItem {...post} /></li>)
                )
            }
        </ol>
    )
}