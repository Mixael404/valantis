const url = 'http://api.valantis.store:40000/'
const password = process.env.PASSWORD;
const today = new Date();

const year = today.getFullYear()
const month = (today.getMonth() + 1).toString().padStart(2, '0')
const day = today.getDate().toString().padStart(2, '0')
const dateKey = `${year}${month}${day}`

const authKey = `${password}_${dateKey}`
// TODO: Make generation using md5. Download md5 library and implement it.
const tmpKey = "80b8a664896f96245af9c5df02e851c3"

function filterDuplicates(ids){
    const dataSet = new Set(ids)
    const filteredArr = [...dataSet]
    return filteredArr
}

async function getIds(offset = null, limit = null) {
    const body = {
        "action": "get_ids",
        "params": {"offset": offset, "limit": limit}
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-AUTH": tmpKey
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return filterDuplicates(data.result)
}

async function getItems(ids=[]) {
    const body = {
        "action": "get_items",
        "params": {"ids": ids}
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-AUTH": tmpKey
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
}

async function getFields(field = null, offset = null, limit = null) {
    const body = {
        "action": "get_fields",
        "params": {"field": field, "offset": offset ,"limit": limit}
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-AUTH": tmpKey
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data.result
}

async function getIdsByFilter(filter = {}) {
    const body = {
        "action": "filter",
        "params": filter
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-AUTH": tmpKey
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return filterDuplicates(data.result)
}

export { getIds, getItems, getFields, getIdsByFilter }