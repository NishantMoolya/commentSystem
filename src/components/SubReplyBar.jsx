import React, { useState } from 'react'
import '../styles/subreply.css'
import Avatar from './Avatar'
import ReplySpinner from './ReplySpinner'

const SubReplyBar = ({mention,triggerReply,userInfo}) => {
    const initialData = {
        answerer:{
          name:userInfo.name,
          role:userInfo.role
        },
        reply:"",
        mention:mention,
      }
      const [content,setContent] = useState(initialData);
      const handleContent = (e) => {
        const { name,value } = e.target;
        setContent(prev => ({...prev,[name]:value}));
      }
      const [posting,setPosting] = useState(false);
      const handleReply = () => {
        if(content.reply !== ""){
            content.reply = content.reply.trim();
            const done = triggerReply([content]);
            setPosting(done);
            setContent(initialData);
        }else{
            alert("write something");
        }
      }  
  return (
    <div className='subreply_input_box'>
            <div className='subreply_user_avatar'>
              <Avatar author={userInfo.name} />
            </div>
            <div className='subreply_input'>
            <p>@{content.mention}</p>
            <textarea name="reply" rows={1} placeholder='your reply' value={content.reply} onChange={handleContent} />
            </div>
            {!posting?<button className='subreply_reply_btn' onClick={handleReply}><i className="fa-solid fa-paper-plane"></i></button>:
            <button id='reply_spinner_btn'><ReplySpinner /></button>}
    </div>
  )
}

export default SubReplyBar