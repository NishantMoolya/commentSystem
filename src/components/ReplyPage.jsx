import React, { useEffect, useState } from 'react'
import QuestionMain from './QuestionMain'
import '../styles/replypage.css'
import Reply from './Reply'
import ReplyBox from './ReplyBox'
import replies from '../data/replies.json'

const ReplyPage = () => {
  const [repliesData, setRepliesData] = useState(replies);
  const addReply = (content,id = 0) => {
    if(id === 0) setRepliesData(prev => ([content,...prev]));
    else{
    //   const newData = repliesData.map(reply => {
    //     if(reply.id === id) reply.child.unshift(content);
    //     return reply;
    // });
    //setRepliesData(newData);
    const parentPos = repliesData.findIndex(reply => reply.id === id);
    let parentdata = repliesData.at(parentPos);
    parentdata.child = [content,...parentdata.child];
    //console.log(parentdata);
    setRepliesData([...repliesData].toSpliced(parentPos,1,parentdata));
    }
  }
  const removeReply = (parentId,childId = 0) => {
    if(childId === 0){
      const pos = repliesData.findIndex(reply => reply.id === parentId);
      setRepliesData([...repliesData].toSpliced(pos,1));
      //console.log('parent');
    }else{
      const parentPos = repliesData.findIndex(reply => reply.id === parentId);
      const childPos = repliesData[parentPos].child.findIndex(reply => reply.id === childId);
      const data = repliesData[parentPos].child.toSpliced(childPos,1);
      const newData = repliesData.at(parentPos);
      newData.child = data;
      setRepliesData([...repliesData].toSpliced(parentPos,1,newData));
      //console.log('child');
    }
  }
  return (
    <div className='replypage_frame'>
        <QuestionMain />
        <ReplyBox addReply={addReply} />
        <div className='replypage_replies'>
          {
            repliesData.map((reply,ind) => <Reply key={reply.id} parent={true} reply={reply} addReply={addReply} removeReply={(childId) => removeReply(reply.id,childId)} />)
          }
        </div>
    </div>
  )
}

export default ReplyPage