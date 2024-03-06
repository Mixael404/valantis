import './PostItem.css'
export default function PostItem(props){
    const {id, product, price, brand} = props

    
    return(
        <div className="postItem">
            <p> id: {id} </p>
            <p> Название: {product} </p>
            <p> Цена: {price} </p>
            <p> {brand && `Бренд: ${brand}`} </p>
        </div>
    )
}