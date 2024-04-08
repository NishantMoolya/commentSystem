import React from 'react'
import ReplyPage from './ReplyPage'
import { Routes,Route } from 'react-router-dom'
import QuestionPage from './QuestionPage'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav style={{height:"3rem",backgroundColor:"var(--primary-color)"}}></nav>
      <div style={{display:'flex'}}>
        <Routes>
          <Route path='/' element={<><h1>Hello</h1><button onClick={() => navigate('/question')}>Go to questions</button></>} />
          <Route path='/question' element={<QuestionPage />} />
          <Route path='/question/:_id' element={<ReplyPage />} />
          <Route path='*' element={"errorpage"} />
        </Routes>
      </div>
    </>
  )
}

export default App