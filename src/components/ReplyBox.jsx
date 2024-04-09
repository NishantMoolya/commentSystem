import React, { useState } from 'react'
import '../styles/replybox.css'
import Avatar from './Avatar'
import ReplySpinner from './ReplySpinner'

const ReplyBox = ({ addReply,posting,userInfo }) => {
  const initialData = {
    answerer:{
      name:userInfo.name,
      role:userInfo.role
    },
    subreplies:[],
    reply:""
  }
  const [content,setContent] = useState(initialData);
  const handleContent = (e) => {
    const { name,value } = e.target;
    setContent(prev => ({...prev,[name]:value}));
  }
  const handleReply = () => {
    if(content.reply !== ''){
      content.reply = content.reply.trim();
      addReply([content],false);
      setContent(initialData);
    }else{
      alert("write something,reply cannot be empty");
    }
  }
  return (
    <div className='replybox_frame'>
        <div className='replybox_header'>
        <div className='replybox_user_avatar'>
        <Avatar author={userInfo.name} />
        </div>
        <h4>{userInfo.name}</h4>
        </div>
        <div className='replybox_main_section'>
            <textarea className='replybox_input' rows={'4'} placeholder='write your answer' name='reply' value={content.reply} onChange={handleContent} />
            {!posting?<button id='replybox_reply_btn' onClick={handleReply}>reply <i className="fa-solid fa-paper-plane"></i></button>:
            <button id='reply_spinner_btn' style={{marginRight:"1rem"}}><ReplySpinner /></button>}
        </div>
    </div>
  )
}

export default ReplyBox