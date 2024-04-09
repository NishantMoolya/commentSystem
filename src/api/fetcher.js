const baseURL = process.env.REACT_APP_BASE_URL;
const getOptions = {
    method:'GET',
    headers:{
        'Content-Type':"application/json"
    },
    crendentials:'include'
}
const fetcher = async (_id) => {
    try {
        const link = `/question/${_id}`;
        const res = await fetch(baseURL+link,getOptions);
        if (res.status === 200) {
            return await res.json();
        }else{
            return [];
        }
    } catch (err) {
        console.log(`an error occurred in fetching:${err}`);
        return [];
    }
}

const fetchReplies = async (_id,more) => {
    try {
        const link = `/question/${_id}/reply?more=${more}`;
        const res = await fetch(baseURL+link,getOptions);
        if (res.status === 200) {
            return await res.json();
        }else{
            return [];
        }
    } catch (err) {
        console.log(`an error occurred in fetching:${err}`);
        return [];
    }
}

const fetchSubReplies = async (_id,more) => {
    try {
        const link = `/reply/${_id}?more=${more}`;
        const res = await fetch(baseURL+link,getOptions);
        if (res.status === 200) {
            return await res.json();
        }else{
            return [];
        }
    } catch (err) {
        console.log(`an error occurred in fetching:${err}`);
        return [];
    }
}

const fetchAllQuestions = async () => {
    try {
        const link = `/question`;
        const res = await fetch(baseURL+link,getOptions);
        if (res.status === 200) {
            return await res.json();
        }else{
            return [];
        }
    } catch (err) {
        console.log(`an error occurred in fetching:${err}`);
        return [];
    }
}

export { fetcher,fetchReplies,fetchSubReplies,fetchAllQuestions };