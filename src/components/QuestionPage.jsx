import React, { useEffect, useState } from 'react'
import Question from './Question';
import '../styles/questionpage.css'
import { fetchAllQuestions } from '../api/fetcher';
import { QuestionCreator } from '../api/replyPageCreators';
import QuestionSkeletion from './QuestionSkeletion';
import ReplySpinner from './ReplySpinner';

const QuestionPage = ({ userInfo }) => {
  
  const [questionList,setQuestionList] = useState([]);  
  const initialContent = {
    question:"",
    questioner:{
      name:userInfo.name,
      role:userInfo.role
    }
  }
  const [questionContent,setQuestionContent] = useState(initialContent);
  const handleQuestion = (e) => {
    const { name,value } = e.target;
    setQuestionContent(prev => ({...prev,[name]:value}));
    //console.log(questionContent.questioner.name,questionContent.questioner.role);
  }
  const [posting,setPosting] = useState(false);
  const postQuestion = () => {
    if(questionContent.question !== ''){
      setPosting(true);
      QuestionCreator(questionContent).then(data => {
        const { date,_id } = data;
        setQuestionList(prev => ([...prev,{...questionContent,date:date,_id:_id}]));
        setPosting(false);
        setShowInput(false);
      });
      setQuestionContent(initialContent);
    }else{
      alert("write something");
    }
  }
  useEffect(() => {
    fetchAllQuestions().then(data => setQuestionList(data));
  },[]);

  const [showInput,setShowInput] = useState(false);
  const textInput = document.getElementById('textarea');
  const askQuestion = () => {
    setShowInput(prev => !prev);
    if(!showInput){
      textInput.focus();
    }
  }
  const display = {
    height:"50vh",
    display:"flex"
  }
  return (
    <div className='questionpage_frame'>
        {questionList.length !== 0?questionList.map(question => <Question key={question._id} question={question} />):
          Array(3).fill(0).map((val,ind) => <QuestionSkeletion key={ind} />)
        }
        <div className='question_writing_pad' style={showInput?display:null}>
          <div className='question_writing_pad_header'>
          <h4>Ask a question. <i className="fa-solid fa-circle-question"></i></h4>
          <button onClick={askQuestion}>{showInput?<i className="fa-solid fa-chevron-down"></i>:<i className="fa-solid fa-chevron-up"></i>}</button>
          </div>
          <textarea style={{display:showInput?display.display:'none'}} id='textarea' name="question" placeholder='Ex. How to decide our goal in life' value={questionContent.question} onChange={handleQuestion} />
          {showInput && (!posting?<button onClick={postQuestion}>Ask</button>:<span style={{width:"1.7rem",alignSelf:"flex-end",marginRight:"1rem"}}><ReplySpinner /></span>)}
        </div>
        
    </div>
  )
}

export default QuestionPage