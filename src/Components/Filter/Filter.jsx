import { useRef } from "react"
import "./Filter.css"
import Pagination from "../Pagination/Pagination"
import Preloader from "../Preloader"
import PostList from "../PostList/PostList"

export default function Filter({data,isLoading,brands, onFilterHandler}) {

    const productInput = useRef(null)
    const priceInput = useRef(null)
    const brandInput = useRef(null)

    async function submitHandler() {
        let filter = {}
        if (productInput.current.value) filter = { "product": productInput.current.value }
        if (priceInput.current.value) filter = { "price": +(priceInput.current.value) }
        if (brandInput.current.value) filter = { "brand": brandInput.current.value }
        onFilterHandler(filter)
    }
    function nameHandler() {
        priceInput.current.value = ''
        brandInput.current.value = ''
    }
    function priceHandler() {
        brandInput.current.value = ''
        productInput.current.value = ''
    }
    function brandHandler() {
        priceInput.current.value = ''
        productInput.current.value = ''
    }


    return (
        <>
            <div className="filtres">
                <input
                    placeholder="Name"
                    type="text"
                    ref={productInput}
                    onChange={nameHandler}
                />

                <div className="price">
                    <input
                        type="number"
                        placeholder="Price"
                        ref={priceInput}
                        onChange={priceHandler}
                        id="priceFilter"
                    />
                </div>

                <select
                    name=""
                    id=""
                    ref={brandInput}
                    onChange={brandHandler}
                >
                    <option value=''>Select brand</option>
                    {
                        brands.map(brand => <option key={brand} value={brand}>{brand}</option>)
                    }
                </select>
                <input
                    onClick={submitHandler}
                    type="submit"
                />
            </div>
            {isLoading ? <Preloader /> : <Pagination data={data}/>}
            {/* {isLoading ? <Preloader /> : <Pagination data={data} ><PostList/></Pagination>} */}
        </>
    )
}