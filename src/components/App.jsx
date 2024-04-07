import React from 'react'
import ReplyPage from './ReplyPage'

const App = () => {
  const seccss = {
    backgroundColor:"black",
    width:"3rem",
  }
  const dis = { display:'none' }
  return (
    <>
      <nav style={{height:"3rem",backgroundColor:"var(--primary-color)"}}></nav>
      <div style={{display:'flex'}}>
      <section style={{...seccss}}></section>
      {/* <section style={{...seccss,...dis}}></section> */}
      <ReplyPage />
      </div>
    </>
  )
}

export default App