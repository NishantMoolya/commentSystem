const baseURL = 'http://localhost:8000/v1/api';
const postOptions = {
    method:'POST',
    headers:{
        'Content-Type':"application/json"
    },
    crendentials:'include',
    body:""
}
const masterCreator = async (content,link,questionId) => {
    try {
        content = {...content,questionId:questionId};
        const res = await fetch(baseURL+link,{...postOptions,body:JSON.stringify(content)});
        if (res.status === 201) {
            return await res.json();
        }else{
            throw Error("server error");
        }
    } catch (err) {
        console.log(`an error occurred in creating:${err}`);
        return { date:new Date(),_id:Date.now() };
    }
}

const QuestionCreator = async (content) => {
    try {
        const link = '/question';
        const res = await fetch(baseURL+link,{...postOptions,body:JSON.stringify(content)});
        if (res.status === 201) {
            return await res.json();
        }else{
            throw Error("server error");
        }
    } catch (err) {
        console.log(`an error occurred in creating:${err}`);
        return { date:new Date(),_id:Date.now() };
    }
}

export { masterCreator,QuestionCreator };