import { useEffect, useRef, useState } from "react"
import "./Filter.css"
import { getIds, getFields, getIdsByFilter } from "../../api"
import Pagination from "../Pagination/Pagination"
import Preloader from "../Preloader"

export default function Filter() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [brands, setBrands] = useState([])

    const productInput = useRef(null)
    const priceInput = useRef(null)
    const brandInput = useRef(null)

    function submitHandler() {
        let filter = {}
        if (productInput.current.value) filter = { "product": productInput.current.value }
        if (priceInput.current.value) filter = { "price": +(priceInput.current.value) }
        if (brandInput.current.value) filter = { "brand": brandInput.current.value }
        
        setIsLoading(true)
        console.log(filter);
        getIdsByFilter(filter)
            .then((data) => {
                setData(data)
                setIsLoading(false)
            })
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


    useEffect(() => {
        getFields("brand")
            .then(data => {
                const brands = data.filter(brand => brand !== null)
                const dataSet = new Set(brands)
                const uniqueBrands = [...dataSet]
                setBrands(uniqueBrands)
            })

        getIds()
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
    }, [])


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
            {isLoading ? <Preloader /> : <Pagination data={data} />}
        </>
    )
}