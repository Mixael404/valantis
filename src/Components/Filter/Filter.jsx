import { useEffect, useState } from "react"
import "./Filter.css"
import { getIds, getItems, getFields, getIdsByFilter } from "../../api"

export default function Filter() {
    const [filterName, setFilterName] = useState('')
    const [filterBrand, setFilterBrand] = useState('')
    const [filterPrice, setFilterPrice] = useState(0)
    const [data, setData] = useState([])

    const [brands, setBrands] = useState([])

    function filterData(incomeData){
        const newData = data.filter((id, index, data) => data.includes(incomeData))
        setData(newData)
    }

    function submitHandler() {
        let filter = {}
        if (filterName) filter = { "product": filterName }
        if (filterPrice) filter = { "price": +(filterPrice) }
        if (filterBrand) filter = { "brand": filterBrand }
        console.log(filter);
        getIdsByFilter(filter)
            .then((data) => {
                console.log(data)
                setData(data)
            })
    }
    function nameHandler(e) {
        setFilterBrand('')
        setFilterPrice('')
        setFilterName(e.target.value)
    }
    function priceHandler(e) {
        setFilterName('')
        setFilterBrand('')
        setFilterPrice(e.target.value)
    }
    function brandHandler(e) {
        setFilterName('')
        setFilterPrice('')
        setFilterBrand(e.target.value)
    }


    useEffect(() => {
        (function getAllBrands() {
            getFields("brand")
                .then(data => {
                    const brands = data.filter(brand => brand !== null)
                    const dataSet = new Set(brands)
                    const uniqueBrands = [...dataSet]
                    setBrands(uniqueBrands)
                })
        })()

        getIds()
            .then(data => setData(data))
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
                    value={filterName}
                    onChange={nameHandler}
                />

                <div className="price">
                    <input
                        type="number"
                        value={filterPrice}
                        onChange={priceHandler}
                        id="priceFilter"
                    />
                    <label htmlFor="priceFilter"> {filterPrice} </label>
                </div>

                <select
                    name=""
                    id=""
                    onChange={brandHandler}
                    value={filterBrand}
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
        </>
    )
}