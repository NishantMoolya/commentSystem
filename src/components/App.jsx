import React, { useEffect, useState } from 'react'
import ReplyPage from './ReplyPage'
import { Routes,Route } from 'react-router-dom'
import QuestionPage from './QuestionPage'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate();
  const [userInfo,setUserInfo] = useState({
    name:"nishant",
    role:"student"
  });
  useEffect(() =>  {
    const id = Math.floor(Math.random()*10)+1;
    const roles = ["faculty","student"];
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  .then((response) => response.json())
  .then((data) => {
    let ind = id > 5?1:0;
    setUserInfo(prev => ({...prev,name:data.name,role:roles[ind]}))
  }).catch(err => console.log(err));
  },[]);
  return (
    <>
      <nav style={{height:"3rem",backgroundColor:"var(--primary-color)"}}></nav>
      <div style={{display:'flex'}}>
        <Routes>
          <Route path='/' element={<><h1>Hello</h1><button onClick={() => navigate('/question')}>Go to questions</button></>} />
          <Route path='/question' element={<QuestionPage userInfo={userInfo} />} />
          <Route path='/question/:_id' element={<ReplyPage userInfo={userInfo} />} />
          <Route path='*' element={"errorpage"} />
        </Routes>
      </div>
    </>
  )
}

export default App