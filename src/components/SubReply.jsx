import React, { useState } from 'react'
import '../styles/subreply.css'
import Reply from './Reply'
import SubReplyBar from './SubReplyBar'

const SubReply = ({ replies,addReply,mention,parentId,removeReply }) => {
  const [show, setShow] = useState(null);
  const triggerReply = (content) => {
    addReply(content,parentId);
    setShow(null);
  }
  const handleMention = (ind) => {
    if(show === ind) setShow(null);
    else setShow(ind);
  }
  return (
    <div className='subreply_frame'>
        <SubReplyBar key={parentId} mention={mention} triggerReply={triggerReply} />
        {
            replies.map((reply,ind) => <>
            <Reply key={reply._id?reply._id:ind} parent={false} reply={reply} handleMention={() => handleMention(ind)} removeReply={removeReply} />
            {(show === ind)&& <SubReplyBar triggerReply={triggerReply} mention={reply.answerer.name} key={reply._id?reply._id:ind} />}
            </>
          )
        }
        <button className='subreply_loadmore_btn'>load more <i className="fa-solid fa-circle-chevron-down"></i></button>
    </div>
  )
}

export default SubReply