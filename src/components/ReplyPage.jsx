import React, { useEffect, useState } from 'react'
import QuestionMain from './QuestionMain'
import '../styles/replypage.css'
import Reply from './Reply'
import ReplyBox from './ReplyBox'
import replies from '../data/replies.json'
import { fetchReplies, fetcher } from '../api/fetcher'

const ReplyPage = () => {
  const [repliesData, setRepliesData] = useState(replies);
  const addReply = (content,id = 0) => {
    if(id === 0) setRepliesData(prev => ([...content,...prev]));
    else{
    const parentPos = repliesData.findIndex(reply => reply._id === id);
    let parentdata = repliesData.at(parentPos);
    parentdata.subreplies = [...content,...parentdata.subreplies];
    setRepliesData([...repliesData].toSpliced(parentPos,1,parentdata));
    }
  }
  const removeReply = (parentId,childId = 0) => {
    if(childId === 0){
      const pos = repliesData.findIndex(reply => reply._id === parentId);
      setRepliesData([...repliesData].toSpliced(pos,1));
    }else{
      const parentPos = repliesData.findIndex(reply => reply._id === parentId);
      const childPos = repliesData[parentPos].subreplies.findIndex(reply => reply._id === childId);
      const data = repliesData[parentPos].subreplies.toSpliced(childPos,1);
      const newData = repliesData.at(parentPos);
      newData.subreplies = data;
      setRepliesData([...repliesData].toSpliced(parentPos,1,newData));
    }
  }
  const [questionData,setQuestionData] = useState(null);
  const questionId = "6612b343a7553b5bba0e9f99";
  useEffect(() => {
    fetcher(questionId).then(data => {
      setQuestionData(data);
      console.log(data);
    });
    fetchReplies(questionId).then(data => {
      setRepliesData(data);
      console.log(data);
    })
  },[]);
  return (
    <div className='replypage_frame'>
        {questionData && <QuestionMain key={questionData._id} questionData={questionData} />}
        <ReplyBox addReply={addReply} />
        <div className='replypage_replies'>
          {
            repliesData.map((reply,ind) => <Reply key={reply._id} parent={reply.parent} reply={reply} addReply={addReply} removeReply={(childId) => removeReply(reply._id,childId)} />)
          }
        </div>
    </div>
  )
}

export default ReplyPage