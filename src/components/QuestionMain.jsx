import React from 'react'
import Avatar from './Avatar'
import '../styles/questionmain.css'

const QuestionMain = ({ questionData }) => {
  return (
    <div className='question_frame'>
        <div className='question_main_div'>
        <div className='question_user_avatar'>
        <Avatar author={questionData.questioner.name} />
        </div>
            <div className='question_header'>
                <div className='question_userinfo'>
                <h4>{questionData.questioner.name}</h4>
                <h6>{questionData.questioner.role}</h6>
                </div>
                <p>{new Date(questionData.date).toDateString()}</p>
            </div>
        </div>
            <p>{questionData.question}</p>
            <div className='question_buttons'>
                <button><i className="fa-solid fa-thumbs-up"></i><span>{questionData.votes > 99?"99+":questionData.votes}</span></button>
                <button><i className="fa-solid fa-thumbs-down"></i><span id='question_downvote'>{questionData.votes > 99?"99+":questionData.votes}</span></button>
            </div>
    </div>
  )
}

export default QuestionMain