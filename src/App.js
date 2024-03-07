import Filter from "./Components/Filter/Filter";
import { useState, useEffect } from "react";
import { getIds, getFields, getIdsByFilter } from "./api"

function App() {
  const [brands, setBrands] = useState([])
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  function handleFilter(filter){
    setIsLoading(true)
    console.log(filter);
    getIdsByFilter(filter)
        .then((data) => {
            setData(data)
            setIsLoading(false)
        })
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
    <div className="App container">
      <Filter brands={brands} data={data} isLoading={isLoading} onFilterHandler={handleFilter} />
    </div>
  );
}

export default App;
