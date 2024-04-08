import React, { useEffect, useState } from 'react'
import Question from './Question';
import '../styles/questionpage.css'
import { fetchAllQuestions } from '../api/fetcher';

const QuestionPage = () => {
  const [questionList,setQuestionList] = useState([]);  
  useEffect(() => {
    fetchAllQuestions().then(data => setQuestionList(data));
  },[]);
  return (
    <div className='questionpage_frame'>
        {questionList.map(question => <Question key={question._id} question={question} />)}
    </div>
  )
}

export default QuestionPage