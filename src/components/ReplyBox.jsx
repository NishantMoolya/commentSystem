import React, { useState } from 'react'
import '../styles/replybox.css'
import avatar from '../assets/person1.jpg'

const ReplyBox = ({ addReply }) => {
  const initialData = {
    name:"nishant moolya",
    date:"",
    child:[],
    parent:true,
    content:"",
    id:null,
    role:"student"
  }
  const [content,setContent] = useState(initialData);
  const handleContent = (e) => {
    const { name,value } = e.target;
    setContent(prev => ({...prev,[name]:value}));
  }
  const handleReply = () => {
    content.content = content.content.trim();
    content.date = new Date();
    content.id = Date.now();
    addReply(content);
    setContent(initialData);
  }
  return (
    <div className='replybox_frame'>
        <div className='replybox_header'>
        <img src={avatar} alt="" className='replybox_user_avatar' />
        <h4>nishant moolya</h4>
        </div>
        <div className='replybox_main_section'>
            <textarea className='replybox_input' rows={'4'} placeholder='write your answer' name='content' value={content.content} onChange={handleContent} />
            <button id='replybox_reply_btn' onClick={handleReply}>reply <i className="fa-solid fa-paper-plane"></i></button>
        </div>
    </div>
  )
}

export default ReplyBox