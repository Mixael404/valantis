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
            resolve(data.result);
        }  else {
            const data = await response.text();
            reject(data)
        }
    })
}

function filterDuplicates(ids){
    const dataSet = new Set(ids)
    const filteredArr = [...dataSet]
    return filteredArr
}

function filterObjects(objects){
    const filteredObjects = objects.filter((post, index, array) => {
        const i = array.findIndex((obj) => obj.id === post.id )
        return index === i 
    })
    return filteredObjects
}

async function getIds(offset = null, limit = null) {
    try{
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
        const data = await checkResponse(response)
        return filterDuplicates(data)
    } catch(err){
        console.warn("Error: " + err);
        return getIds(offset,limit)
    }
}

async function getItems(ids=[]) {
    try {
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
        const data = await checkResponse(response)
        return filterObjects(data)
    } catch (error) {
        console.warn("Error: " + error);
        return getItems(ids)
    }
    
}

async function getFields(field = null, offset = null, limit = null) {
    try {
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
        const data = await checkResponse(response)
        return data
    } catch (error) {
        console.warn("Error: " + error);
        return getFields(field, offset, limit)
    }
    
}

async function getIdsByFilter(filter = {}) {
    try {
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
        const data = await checkResponse(response)
        return filterDuplicates(data)
    } catch (error) {
        console.warn("Error: " + error);
        return getIdsByFilter(filter)
    }
    
}

export { getIds, getItems, getFields, getIdsByFilter }