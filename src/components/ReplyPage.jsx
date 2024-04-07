import React, { useEffect, useState } from 'react'
import QuestionMain from './QuestionMain'
import '../styles/replypage.css'
import Reply from './Reply'
import ReplyBox from './ReplyBox'
import replies from '../data/replies.json'
import { fetcher } from '../api/fetcher'

const ReplyPage = () => {
  const [repliesData, setRepliesData] = useState(replies);
  const addReply = (content,id = 0) => {
    if(id === 0) setRepliesData(prev => ([content,...prev]));
    else{
    const parentPos = repliesData.findIndex(reply => reply._id === id);
    let parentdata = repliesData.at(parentPos);
    parentdata.child = [content,...parentdata.child];
    setRepliesData([...repliesData].toSpliced(parentPos,1,parentdata));
    }
  }
  const removeReply = (parentId,childId = 0) => {
    if(childId === 0){
      const pos = repliesData.findIndex(reply => reply._id === parentId);
      setRepliesData([...repliesData].toSpliced(pos,1));
    }else{
      const parentPos = repliesData.findIndex(reply => reply._id === parentId);
      const childPos = repliesData[parentPos].child.findIndex(reply => reply._id === childId);
      const data = repliesData[parentPos].child.toSpliced(childPos,1);
      const newData = repliesData.at(parentPos);
      newData.child = data;
      setRepliesData([...repliesData].toSpliced(parentPos,1,newData));
    }
  }
  const [questionData,setQuestionData] = useState(null);
  useEffect(() => {
    fetcher().then(data => {
      setQuestionData(data[0]);
      console.log(data);
    });
  },[]);
  return (
    <div className='replypage_frame'>
        {questionData && <QuestionMain key={questionData._id} questionData={questionData} />}
        <ReplyBox addReply={addReply} />
        <div className='replypage_replies'>
          {
            repliesData.map((reply,ind) => <Reply key={reply._id} parent={true} reply={reply} addReply={addReply} removeReply={(childId) => removeReply(reply._id,childId)} />)
          }
        </div>
    </div>
  )
}

export default ReplyPage