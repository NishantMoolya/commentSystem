import React, { useState } from 'react'
import '../styles/subreply.css'
import Reply from './Reply'
import SubReplyBar from './SubReplyBar'
import Loader from './Loader'

const SubReply = ({ parentReply,addReply,removeReply,lazyFetchSubReplies,lazyParams,userInfo }) => {
  const [show, setShow] = useState(false);
  const triggerReply = (content) => {
    addReply(content,false,parentReply._id);
    return true;
  }
  const handleMention = (ind) => {
    if(show === ind) setShow(false);
    else setShow(ind);
  }
  return (
    <div className='subreply_frame'>
        <SubReplyBar key={parentReply._id} userInfo={userInfo} mention={parentReply.answerer.name} triggerReply={triggerReply} />
        {
            parentReply.subreplies?.map((reply,ind) => <>
            <Reply key={reply._id?reply._id:ind} parent={false} reply={reply} handleMention={() => handleMention(ind)} removeReply={removeReply} />
            {(show === ind)&& <SubReplyBar userInfo={userInfo} triggerReply={triggerReply} mention={reply.answerer.name} key={reply._id?reply._id:ind} />}
            </>
          )
        }
        {(lazyParams.canLoad && (lazyParams.more < (parentReply.totalReplies/3)+1) && !lazyParams.isLoading) && <button className='subreply_loadmore_btn' onClick={lazyFetchSubReplies}><i className="fa-solid fa-circle-chevron-down"></i></button>}
        {lazyParams.isLoading && <Loader />}
    </div>
  )
}
export default SubReply