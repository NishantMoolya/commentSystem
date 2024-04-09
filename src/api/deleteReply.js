const baseURL = 'http://localhost:8000/v1/api';
const delOptions = {
    method:'DELETE',
    headers:{
        'Content-Type':"application/json"
    },
    crendentials:'include'
}
const deleteReply = async (_id,path) => {
    try {
        const link = `/question/${_id}${path}`;
        const res = await fetch(baseURL+link,delOptions);
        if (res.status === 204) {
            return null;
        }else{
            throw Error('server error');
        }
    } catch (err) {
        console.log(`an error occurred in deleting:${err}`);
        return null;
    }
}

export { deleteReply };