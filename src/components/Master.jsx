import React, { useState } from 'react'
import ReplySeries from './ReplySeries'
import Input from './Input'
import totalreplies from '../data/replies.json'

const Master = () => {
  const [replyData,setReplyData] = useState([]);
  const [input, setInput] = useState({
    name:'nishnat mool',
    content:'',
    parent:true,
    child:[]
  });
  const handleInput = (e) => {
    const { value,name } = e.target;
    setInput(prev => ({...prev,[name]:value}));
  }
  const addReply = () => {
    setReplyData(prev => [...prev,input]);
    setInput(prev => ({...prev,content:''}));
    console.log('replies',replyData);
  }
  return (
    <div>
      {/* <Input input={input} handleInput={handleInput} addReply={addReply} />
      <ReplySeries replyData={replyData} /> */}
      <Input input={input} handleInput={handleInput} addReply={addReply} />
      <ReplySeries replyData={replyData} />
    </div>
  )
}

export default Master