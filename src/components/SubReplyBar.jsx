import React, { useState } from 'react'
import '../styles/subreply.css'
import Avatar from './Avatar'

const SubReplyBar = ({mention,triggerReply}) => {
    const initialData = {
        answerer:{
          name:"nishant moolya",
          role:"student"
        },
        reply:"",
        mention:mention,
      }
      const [content,setContent] = useState(initialData);
      const handleContent = (e) => {
        const { name,value } = e.target;
        setContent(prev => ({...prev,[name]:value}));
      }
      const handleReply = () => {
        if(content.reply !== ""){
            content.reply = content.reply.trim();
            triggerReply([content]);
            setContent(initialData);
        }else{
            alert("write something");
        }
      }  
  return (
    <div className='subreply_input_box'>
            <div className='subreply_user_avatar'>
              <Avatar author={mention} />
            </div>
            <div className='subreply_input'>
            <p>@{content.mention}</p>
            <textarea name="reply" rows={1} placeholder='your reply' value={content.reply} onChange={handleContent} />
            </div>
            <button className='subreply_reply_btn' onClick={handleReply}><i className="fa-solid fa-paper-plane"></i></button>
    </div>
  )
}

export default SubReplyBar