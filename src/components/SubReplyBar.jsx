import React, { useState } from 'react'
import '../styles/subreply.css'
import Avatar from './Avatar'

const SubReplyBar = ({mention,triggerReply}) => {
    const initialData = {
        name:"nishant moolya",
        date:"",
        content:"",
        mention:mention,
        _id:null,
        role:"student"
      }
      const [content,setContent] = useState(initialData);
      const handleContent = (e) => {
        const { name,value } = e.target;
        setContent(prev => ({...prev,[name]:value}));
      }
      const handleReply = () => {
        if(content.content !== ""){
            content.content = content.content.trim();
            content.date = new Date();
            content._id = Date.now();
            triggerReply(content);
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
            <textarea name="content" rows={1} placeholder='your reply' value={content.content} onChange={handleContent} />
            </div>
            <button className='subreply_reply_btn' onClick={handleReply}><i className="fa-solid fa-paper-plane"></i></button>
    </div>
  )
}

export default SubReplyBar