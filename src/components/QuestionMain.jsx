import React, { useState } from 'react'
import Avatar from './Avatar'
import '../styles/questionmain.css'
import { voteQuestion } from '../api/voter'

const QuestionMain = ({ questionData }) => {
  const [likes,setLikes] = useState(questionData.votes);
  const [lock,setLock] = useState(false);
  const handleVote = () => {
    if(!lock){
      voteQuestion(questionData._id);
      setLikes(prev => prev+1);
      setLock(true);
    }
  }
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
                <button><i className="fa-solid fa-comment-dots"></i><span>{questionData.totalReplies > 99?"99+":questionData.totalReplies}</span></button>
                <button><i className="fa-solid fa-thumbs-up" onClick={handleVote}></i><span>{likes > 99?"99+":likes}</span></button>
                {/* <button><i className="fa-solid fa-thumbs-down"></i><span id='question_downvote'>{questionData.votes > 99?"99+":questionData.votes}</span></button> */}
            </div>
    </div>
  )
}

export default QuestionMain