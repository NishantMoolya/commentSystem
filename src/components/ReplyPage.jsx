import React, { useEffect, useRef, useState } from 'react'
import QuestionMain from './QuestionMain'
import '../styles/replypage.css'
import Reply from './Reply'
import ReplyBox from './ReplyBox'
import replies from '../data/replies.json'
import { fetchReplies, fetcher } from '../api/fetcher'
import { masterCreator } from '../api/replyPageCreators'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import { deleteReply } from '../api/deleteReply'

const ReplyPage = () => {
  //const questionId = "6613fe1a6e7e2ce61b60b96f";
  const params = useParams();
  const questionId = params._id;
  const [repliesData, setRepliesData] = useState([]);
  
  const addReply = (content,lazy,id = 0) => {
    if(id === 0) {
      if(lazy){
        setRepliesData(prev => ([...content,...prev]));
      }else{
        masterCreator(content[0],`/question/${questionId}/reply`).then(data => {
          const { _id,date } = data;
          content[0] = {...content[0],date:date,_id:_id,parent:true,subreplies:[],totalReplies:0};
          setRepliesData(prev => ([...content,...prev]));
        });
      }
    }
    else{
      if(lazy){
          const parentPos = repliesData.findIndex(reply => reply._id === id);
          let parentdata = repliesData.at(parentPos);
          parentdata.subreplies = [...parentdata.subreplies,...content];
          setRepliesData([...repliesData].toSpliced(parentPos,1,parentdata));
      }else{
        masterCreator(content[0],`/reply/${id}`,questionId).then(data => {
          const { _id,date } = data;
          // content[0].date = date;
          // content[0]._id = _id;
          // content[0].parent = false;
          content[0] = {...content[0],date:date,_id:_id,parent:false};
          const parentPos = repliesData.findIndex(reply => reply._id === id);
          let parentdata = repliesData.at(parentPos);
          parentdata.subreplies = [...parentdata.subreplies,...content];
          setRepliesData([...repliesData].toSpliced(parentPos,1,parentdata));
        })
      }
    }
  }

  const removeReply = (parentId,childId = 0) => {
    if(childId === 0){
      deleteReply(questionId,`?replyId=${parentId}`).then(res => {
        const pos = repliesData.findIndex(reply => reply._id === parentId);
        setRepliesData([...repliesData].toSpliced(pos,1));
      })
    }else{
      deleteReply(questionId,`/reply?parentId=${parentId}&subreplyId=${childId}`).then(res => {
        const parentPos = repliesData.findIndex(reply => reply._id === parentId);
        const childPos = repliesData[parentPos].subreplies.findIndex(reply => reply._id === childId);
        const data = repliesData[parentPos].subreplies.toSpliced(childPos,1);
        const newData = repliesData.at(parentPos);
        newData.subreplies = data;
        setRepliesData([...repliesData].toSpliced(parentPos,1,newData));
      })
    }
  }
  const [questionData,setQuestionData] = useState(null);
  
  //to fetch question
  useEffect(() => {
      if(questionData === null){
     fetcher(questionId).then(data => {
          if(data.length !== 0) setQuestionData(data);
          console.log(data);
        });
      }
    },[]);

  const replyPageRef = useRef(null);
  const [lazyParams,setLazyParams] = useState({
    more:1,
    canScroll:true,
    isLoading:true
  });
  //to lazy load replies
  useEffect(() => {
    fetchReplies(questionId,lazyParams.more).then(data => {
      if(data.length === 0) {
        setLazyParams(prev => ({...prev,canScroll:false,isLoading:false}));
      }else{
        setLazyParams(prev => ({...prev,isLoading:false}));
        setRepliesData(prev => [...prev,...data]);
      }
      console.log(data);
    })
  },[lazyParams.more]);

  
  const handleScroll = () => {
    if(replyPageRef.current.clientHeight + replyPageRef.current.scrollTop+1 >= replyPageRef.current.scrollHeight){
      if(lazyParams.canScroll){
        console.log('hello'); 
        setLazyParams(prev => ({...prev,more:prev.more+1,isLoading:true}));
      }
    }
  }

  return (
    <div className='replypage_frame' ref={replyPageRef} onScroll={() => handleScroll()}>
        {questionData && <QuestionMain key={questionData._id} questionData={questionData} />}
        <ReplyBox addReply={addReply} />
        <div className='replypage_replies'>
          {
            repliesData.map((reply,ind) => <Reply key={reply._id} parent={reply.parent} reply={reply} addReply={addReply} removeReply={(childId = 0) => removeReply(reply._id,childId)} setRepliesData={setRepliesData} />)
          }
        </div>
        <div>
        {lazyParams.isLoading && <Loader />}
        </div>
    </div>
  )
}

export default ReplyPage