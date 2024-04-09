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
import QuestionSkeletion from './QuestionSkeletion'
import { deleteReply } from '../api/deleteReply'

const ReplyPage = ({ userInfo }) => {
  //const questionId = "6613fe1a6e7e2ce61b60b96f";
  const params = useParams();
  const questionId = params._id;
  const [repliesData, setRepliesData] = useState([]);
  const [lazyParams,setLazyParams] = useState({
    more:1,
    canScroll:true,
    isLoading:true,
    posting:false
  });
  
  const addReply = (content,lazy,id = 0) => {
    if(id === 0) {
      if(lazy){
        setRepliesData(prev => ([...content,...prev]));
      }else{
        setLazyParams(prev => ({...prev,posting:true}));
        masterCreator(content[0],`/question/${questionId}/reply`).then(data => {
          const { _id,date } = data;
          content[0] = {...content[0],date:date,_id:_id,parent:true,subreplies:[],totalReplies:0};
          setRepliesData(prev => ([...content,...prev]));
          setLazyParams(prev => ({...prev,posting:false}));
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
          //console.log(data);
        });
      }
    },[]);

  const replyPageRef = useRef(null);
  
  //to lazy load replies
  useEffect(() => {
      fetchReplies(questionId,lazyParams.more).then(data => {
        if(data.length === 0) {
          setLazyParams(prev => ({...prev,canScroll:false,isLoading:false}));
        }else{
          setLazyParams(prev => ({...prev,isLoading:false}));
          setRepliesData(prev => [...prev,...data]);
        }
        //console.log(data);
      })
  },[lazyParams.more]);

  
  const handleScroll = () => {
    if(replyPageRef.current.clientHeight + replyPageRef.current.scrollTop+1 >= replyPageRef.current.scrollHeight){
      if(lazyParams.canScroll && lazyParams.more < (questionData?.totalReplies/3)+1){
        setLazyParams(prev => ({...prev,more:prev.more+1,isLoading:true}));
      }
    }
  }

  return (
    <div className='replypage_frame' ref={replyPageRef} onScroll={() => handleScroll()}>
        {questionData?<QuestionMain key={questionData._id} questionData={questionData} />:<QuestionSkeletion />}
        <ReplyBox addReply={addReply} posting={lazyParams.posting} userInfo={userInfo} />
        <div className='replypage_replies'>
          {
            repliesData.length !== 0?repliesData.map((reply,ind) => <Reply key={reply._id} userInfo={userInfo} parent={reply.parent} reply={reply} addReply={addReply} removeReply={(childId = 0) => removeReply(reply._id,childId)} setRepliesData={setRepliesData} />)
            :Array(3).fill(3).map((reply,ind) => <QuestionSkeletion key={ind} />)
          }
        </div>
        <div>
        {lazyParams.isLoading && <Loader />}
        </div>
    </div>
  )
}

export default ReplyPage