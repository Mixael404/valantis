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

function checkResponse(response) {
    return new Promise(async function(resolve, reject) {
        if(response.status === 200) {
            const data = await response.json();
            console.log(data);
            resolve(data.result);
        }  else {
            const data = await response.text();
            reject(data)
        }
    })
}

function filterDuplicateIds(ids) {
    const dataSet = new Set(ids)
    const filteredArr = [...dataSet]
    return filteredArr
}

function filterObjects(objects) {
    const filteredObjects = objects.filter((post, index, array) => {
        const i = array.findIndex((obj) => obj.id === post.id)
        return index === i
    })
    return filteredObjects
}

async function getIds(offset = null, limit = null) {
    const body = {
        "action": "get_ids",
        "params": { "offset": offset, "limit": limit }
    }
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-AUTH": authKey
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return filterDuplicateIds(data.result)
    } catch (error){
        console.warn("Error ids");
        console.info(error);
        return getIds()
    }
}

async function getItems(ids = []) {
    const body = {
        "action": "get_items",
        "params": { "ids": ids }
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-AUTH": authKey
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return filterObjects(data.result)
    } catch (error) {
        console.warn("ОШИБКА items=============");
        console.info(error);
        return getItems(ids)
    }
}

async function getFields(field = null, offset = null, limit = null) {
    const body = {
        "action": "get_fields",
        "params": { "field": field, "offset": offset, "limit": limit }
    }
    try{

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
    } catch(error){
        console.warn("Filter error");
        return getFields(field, offset, limit)
    }
}

async function getIdsByFilter(filter = {}) {
    const body = {
        "action": "filter",
        "params": filter
    }
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-AUTH": authKey
            },
            body: JSON.stringify(body)
        })
        
        const result = await checkResponse(response);
        return filterDuplicateIds(result)
    } catch (error){
        if(error) {
            console.error("INSIDE CATCH!!!!" + error);
        }
        console.warn("Error in getIdsByFilter");
        return getIdsByFilter(filter)
    }
}

export { getIds, getItems, getFields, getIdsByFilter }