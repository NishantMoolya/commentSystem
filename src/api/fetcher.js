const baseURL = 'http://localhost:8000/v1/api';
const fetcher = async (_id) => {
    try {
        const link = `/question/${_id}`;
        const options = {
            method:'GET',
            headers:{
                'Content-Type':"application/json"
            }
        }
        const res = await fetch(baseURL+link,options);
        if (res.status === 200) {
            return await res.json();
        }else{
            return [];
        }
    } catch (err) {
        console.log(`an error occurred in fetching:${err}`);
    }
}

const fetchReplies = async (_id) => {
    try {
        const link = `/question/${_id}/reply?more=1`;
        const options = {
            method:'GET',
            headers:{
                'Content-Type':"application/json"
            }
        }
        const res = await fetch(baseURL+link,options);
        if (res.status === 200) {
            return await res.json();
        }else{
            return [];
        }
    } catch (err) {
        console.log(`an error occurred in fetching:${err}`);
    }
}

const fetchSubReplies = async (_id) => {
    try {
        const link = `/reply/${_id}?more=1`;
        const options = {
            method:'GET',
            headers:{
                'Content-Type':"application/json"
            }
        }
        const res = await fetch(baseURL+link,options);
        if (res.status === 200) {
            return await res.json();
        }else{
            return [];
        }
    } catch (err) {
        console.log(`an error occurred in fetching:${err}`);
    }
}

export { fetcher,fetchReplies,fetchSubReplies };