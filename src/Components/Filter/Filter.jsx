import { useEffect, useRef, useState } from "react"
import "./Filter.css"
import { getIds, getItems, getFields, getIdsByFilter } from "../../api"
import Pagination from "../Pagination/Pagination"
import Preloader from "../Preloader"
import PostList from "../PostList/PostList"

export default function Filter() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [brands, setBrands] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    
    const [filter, setFilter] = useState({})

    // function filterData(incomeData){
    //     const newData = data.filter((id, index, data) => data.includes(incomeData))
    //     setData(newData)
    // }

    const productInput = useRef(null)
    const priceInput = useRef(null)
    const brandInput = useRef(null)

    async function submitHandler() {
        let filter = {}
        if (productInput.current.value) filter = { "product": productInput.current.value }
        if (priceInput.current.value) filter = { "price": +(priceInput.current.value) }
        if (brandInput.current.value) filter = { "brand": brandInput.current.value }
        setFilter(filter)
        setIsLoading(true)
        console.log(filter);
        // getIdsByFilter(filter)
        //     .then((data) => {
        //         console.log(data);
        //         getItems(data)
        //         // TODO: Отрефакторить вложенность 
        //             .then((data) => {
        //                 console.log(data);
        //                 setData(data)
        //                 setIsLoading(false)
        //             })
        //     })
        // .then(data => {
        //     console.log(data);
        //     setData(data)
        //     setIsLoading(false)
        // })
        const ids = await getIdsByFilter(filter)
        const items = await getItems(ids)
        setData(items)
        setIsLoading(false)
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

    // TODO: Написать юз эффект с зависимостью от текущей страницы, в котором получать айди с заданным оффсетом и лимитом. Лимит - константа, оффсет рассчитывать исходя из текущей страницы. При монтировании скачивать 100 постов, при переходе - 50 на следующей странице.

    // TODO: Протестить правильность работы, обрабатывать случай с движением назад. Накидывать класс дисэйблед во время загрузки. Подружить эффект с фильтром.
    useEffect(() => {
        console.log("Current page: " + currentPage);
        const offset = currentPage * 50;
        console.log("Offset: " + offset);
        if(currentPage > 1){
            getIds(offset, 51)
                .then(data => getItems(data))
                .then((data) => setData((prev) => [...prev, ...data]))
        }
    }, [currentPage])

    useEffect(() => {
        getFields("brand")
            .then(data => {
                const brands = data.filter(brand => brand !== null)
                const dataSet = new Set(brands)
                const uniqueBrands = [...dataSet]
                setBrands(uniqueBrands)
            })

        getIds(0 , 101)
            .then(data => getItems(data))
            .then(data => {
                console.log(data);
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
            {isLoading ? <Preloader /> : <Pagination data={data} isLoading={isLoading} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            {/* {isLoading ? <Preloader /> : <Pagination data={data} ><PostList/></Pagination>} */}
        </>
    )
}