import PostItem from "../PostItem/PostItem"

export default function PostList({ data }) {
    return (
        <ol>
            {   
                data.map((post) => <li key={post.id}> <PostItem {...post} /></li>)
            }
        </ol>
    )
}