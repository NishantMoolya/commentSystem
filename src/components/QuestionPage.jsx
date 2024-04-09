import React, { useEffect, useState } from 'react'
import Question from './Question';
import '../styles/questionpage.css'
import { fetchAllQuestions } from '../api/fetcher';
import { QuestionCreator } from '../api/replyPageCreators';

const QuestionPage = () => {
  const [questionList,setQuestionList] = useState([]);  
  const initialContent = {
    question:"",
    questioner:{
      name:"nishant moolya",
      role:"student"
    }
  }
  const [questionContent,setQuestionContent] = useState(initialContent);
  const handleQuestion = (e) => {
    const { name,value } = e.target;
    setQuestionContent(prev => ({...prev,[name]:value}));
  }
  const postQuestion = () => {
    if(questionContent.question !== ''){
      QuestionCreator(questionContent).then(data => {
        const { date,_id } = data;
        setQuestionList(prev => ([...prev,{...questionContent,date:date,_id:_id}]));
      });
      setQuestionContent(initialContent);
    }
  }
  useEffect(() => {
    fetchAllQuestions().then(data => setQuestionList(data));
  },[]);
  return (
    <div className='questionpage_frame'>
        {questionList.map(question => <Question key={question._id} question={question} />)}
        <div>
          <textarea name="question" rows="4" value={questionContent.question} onChange={handleQuestion} />
          <button onClick={postQuestion}>Ask</button>
        </div>
    </div>
  )
}

export default QuestionPage