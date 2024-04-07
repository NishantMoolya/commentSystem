const baseURL = 'http://localhost:8000/v1/api';
const fetcher = async (link) => {
    try {
        const link = '/question';
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

export { fetcher };