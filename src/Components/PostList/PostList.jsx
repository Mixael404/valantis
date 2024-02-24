import PostItem from "../PostItem/PostItem"

export default function PostList({data}){

    return(
        <ol>
        {
            data.map((id) => <li><PostItem key={id} id={id} /></li>)
        }
        </ol>
    )
}