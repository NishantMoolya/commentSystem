import React, { useState } from 'react'
import '../styles/replybox.css'
import Avatar from './Avatar'

const ReplyBox = ({ addReply }) => {
  const initialData = {
    answerer:{
      name:"nishant moolya",
      role:"student"
    },
    date:"",
    subreplies:[],
    parent:true,
    reply:"",
    _id:null,
  }
  const [content,setContent] = useState(initialData);
  const handleContent = (e) => {
    const { name,value } = e.target;
    setContent(prev => ({...prev,[name]:value}));
  }
  const handleReply = () => {
    content.content = content.reply.trim();
    content.date = new Date();
    content._id = Date.now();
    addReply([content]);
    setContent(initialData);
  }
  return (
    <div className='replybox_frame'>
        <div className='replybox_header'>
        <div className='replybox_user_avatar'>
        <Avatar author={"nishant moolya"} />
        </div>
        <h4>nishant moolya</h4>
        </div>
        <div className='replybox_main_section'>
            <textarea className='replybox_input' rows={'4'} placeholder='write your answer' name='reply' value={content.reply} onChange={handleContent} />
            <button id='replybox_reply_btn' onClick={handleReply}>reply <i className="fa-solid fa-paper-plane"></i></button>
        </div>
    </div>
  )
}

export default ReplyBox