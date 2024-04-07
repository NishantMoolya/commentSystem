import React, { useEffect, useState } from 'react'
import '../styles/reply.css'
import SubReply from './SubReply';
import Avatar from './Avatar';
import { fetchSubReplies } from '../api/fetcher';

const Reply = ({ parent,reply,addReply,handleMention,removeReply }) => {
  const [show, setShow] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const clamp = { WebkitLineClamp: 3 };
  const timeLimit = 5;
  const diff = Math.floor((Date.now() - new Date(reply.date).getTime())/60000);
  const [canDelete, setCanDelete] = useState(diff <= timeLimit);
  useEffect(() => {
    let timer = null;
    if(canDelete){
      timer = setTimeout(() => {
        setCanDelete(false);
        //console.log('runned');
      },(timeLimit - diff)*60000)
    }
    return () => clearTimeout(timer);
  },[]);
  const handleDelete = () => {
    const answer = window.confirm("Reply will be deleted permanantly");
    if (answer) {
      if(parent) removeReply();
      else removeReply(reply._id);
    }
  }
  const [lock, setLock] = useState(true);
  const handleSubReplies = () => {
    setShow(prev => !prev);
    if(lock && !show){
      fetchSubReplies(reply._id).then(data => {
        console.log(data);
        addReply(data,reply._id);
      });
      setLock(false);
    }
  }
  return (
    <div>
    <div className='reply_frame'>
      <div className='reply_header'>
        <div className='reply_user_avatar'>
          <Avatar author={reply.answerer.name} />
        </div>
        <div className='reply_user_info'>
          <h5 onClick={handleMention}>{reply.answerer.name} <span id='reply_user_designation'>({reply.answerer.role})</span></h5>
          <p>{diff < 60?`${diff} min ago`:`${new Date(reply.date).toDateString()}`}</p>
        </div>
        {canDelete && <div className='reply_tool_btns'>
          <button onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
        </div>}
      </div>
      <p onClick={() => setReadMore(prev => !prev)} style={readMore?null:clamp}>{!parent && <span id='reply_mention'>@{reply?.mention}</span>} {reply.reply}</p>
      {parent && <button id='reply_btn' onClick={handleSubReplies}><i className="fa-solid fa-reply"></i></button>}
    </div>
      {
        show && <SubReply key={`${reply._id}+${Date.now().toString()}`} mention={reply.answerer.name} replies={reply.subreplies} addReply={addReply} parentId={reply._id} removeReply={removeReply} />
      }
      </div>
  )
}

export default Reply