import './PostItem.css'
import { getItems } from '../../api'
import { useEffect, useState } from 'react'
export default function PostItem(props){
    // const [name, setName] = useState('')
    const {id, product, price, brand} = props

    // useEffect(() => {
    //     getItems([id])
    //         .then((data) => {
    //             const object = data[0]
    //             console.log(object);
    //             setName(object.product)
    //             // price = object['price']
    //             // brand = object['brand']
    //         })
    // }, [])

    
    return(
        <div className="postItem">
            <p> id: {id} </p>
            <p> Название: {product} </p>
            <p> Цена: {price} </p>
            <p> {brand && `Бренд: ${brand}`} </p>
        </div>
    )
}