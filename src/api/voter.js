const baseURL = 'http://localhost:8000/v1/api';
const postOptions = {
    method:'POST',
    headers:{
        'Content-Type':"application/json"
    },
    crendentials:'include'
}
const voteQuestion = async (questionId) => {
    try {
        const link = `/question/${questionId}/vote?voted=true`
        const res = await fetch(baseURL+link,postOptions);
        if (res.status === 201) {
            return await res.json();
        }else{
            throw Error("server error");
        }
    } catch (err) {
        console.log(`an error occurred in voting:${err}`);
    }
}

export { voteQuestion };