import { useEffect, useState } from "react"
import PostItem from "../PostItem/PostItem"
import { getItems } from '../../api'
import Preloader from "../Preloader"

export default function PostList({ data }) {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log("Работает юз эффект в пост листе");
        setIsLoading(true)
        getItems(data)
            .then((res) => {
                console.log("Data from pagination");
                console.log(data);
                // Добавил проверку на то, что что-то есть в ответе от сервера.
                if(res.length){
                    setPosts(res)
                    setIsLoading(false)
                }
                console.log("Result: ============");
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