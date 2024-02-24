import md5 from "js-md5";

const url = 'http://api.valantis.store:40000/'
// TODO: Вынести в envLocal
const PASSWORD = "Valantis";
const today = new Date();


const year = today.getFullYear()
const month = (today.getMonth() + 1).toString().padStart(2, '0')
const day = today.getDate().toString().padStart(2, '0')
const dateKey = `${year}${month}${day}`

const textKey = `${PASSWORD}_${dateKey}`
const authKey = md5(textKey)

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
            "X-AUTH": authKey
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
            "X-AUTH": authKey
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
            "X-AUTH": authKey
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
            "X-AUTH": authKey
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return filterDuplicates(data.result)
}

export { getIds, getItems, getFields, getIdsByFilter }