import React from 'react'
import '../styles/question.css'
import Avatar from './Avatar'
import { useNavigate } from 'react-router-dom'

const Question = ({ question }) => {
  const navigate = useNavigate();
  const handleQuestion = () => {
    navigate(`/question/${question._id}`);
  }
  return (
    <div className='single_question_frame' onClick={handleQuestion}>
        <div className='single_question_user_avatar'>
        <Avatar author={question.questioner.name} />
        </div>
        <div className='single_question_header'> 
        <div className='single_question_info'>
        <p>{new Date(question.date).toDateString()}</p>
        <div className='question_button_group'>
        <button><i className="fa-solid fa-comment-dots"></i><span>{question.totalReplies > 99?"99+":question.totalReplies}</span></button>
        <button><i className="fa-solid fa-thumbs-up"></i><span>{question.votes > 99?"99+":question.votes}</span></button>
        </div>
        </div>
        <p className='question_content'>{question.question}</p>
        </div>
    </div>
  )
}

export default Question