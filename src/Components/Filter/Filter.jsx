import { useEffect, useRef, useState } from "react"
import "./Filter.css"
import { getIds, getItems, getFields, getIdsByFilter } from "../../api"
import Pagination from "../Pagination/Pagination"
import Preloader from "../Preloader"

export default function Filter() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [brands, setBrands] = useState([])

    // function filterData(incomeData){
    //     const newData = data.filter((id, index, data) => data.includes(incomeData))
    //     setData(newData)
    // }

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
    function nameHandler(e) {
        priceInput.current.value = ''
        brandInput.current.value = ''
        // setFilterBrand('')
        // priceInput.current.value = ''
        // setFilterName(e.target.value)
    }
    function priceHandler(e) {
        brandInput.current.value = ''
        productInput.current.value = ''
        // setFilterName('')
        // setFilterBrand('')
        // setFilterPrice(e.target.value)
    }
    function brandHandler(e) {
        priceInput.current.value = ''
        productInput.current.value = ''
        // setFilterName('')
        // setFilterBrand(e.target.value)
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


    // useEffect(() => {
    //     setFilterName('')
    //     setFilterBrand('')
    //     const filter = {
    //         "price": +(filterPrice),
    //     }
    //     console.log(filter);
    //     getIdsByFilter(filter)
    //         .then((data) => {
    //             // console.log("Income data: " + data)
    //             // console.log("Filtered data: " + filterData(data));
    //             setData(data)
    //         })
    // }, [filterPrice])


    // useEffect(() => {
    //     setFilterPrice('')
    //     setFilterBrand('')
    //     const filter = {
    //         "product": filterName,
    //     }
    //     console.log(filter);
    //     getIdsByFilter(filter)
    //         .then((data) => {
    //             // console.log("Income data: " + data)
    //             // console.log("Filtered data: " + filterData(data));
    //             setData(data)
    //         })
    // }, [filterName])


    // useEffect(() => {
    //     const filter = {
    //         "brand": filterBrand,
    //     }
    //     console.log(filter);
    //     getIdsByFilter(filter)
    //         .then((data) => console.log(data))
    // }, [filterBrand])

    return (
        <>
            <div className="filtres">
                <input
                    placeholder="Name"
                    type="text"
                    ref={productInput}
                    // value={filterName}
                    onChange={nameHandler}
                />

                <div className="price">
                    <input
                        type="number"
                        placeholder="Price"
                        ref={priceInput}
                        // value={filterPrice}
                        onChange={priceHandler}
                        id="priceFilter"
                    />
                </div>

                <select
                    name=""
                    id=""
                    ref={brandInput}
                    onChange={brandHandler}
                // value={filterBrand}
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