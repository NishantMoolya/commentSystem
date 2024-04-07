import React from 'react'
import avatar from '../assets/person1.jpg'
import Avatar from './Avatar'
import '../styles/questionmain.css'

const QuestionMain = () => {
    const val = 5;
  return (
    <div className='question_frame'>
        <div className='question_main_div'>
        <div className='question_user_avatar'>
        <Avatar author={"nishant moolya"} />
        </div>
            <div className='question_header'>
                <div className='question_userinfo'>
                <h4>nishant moolya</h4>
                <h6>faculty</h6>
                </div>
                <p>wed 9 oct 2024</p>
            </div>
        </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit reprehenderit sunt esse suscipit sed minus. Laudantium cumque cupiditate soluta distinctio!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sapiente praesentium deleniti. Modi et distinctio quasi nam. Eligendi, iure recusandae! </p>
            <div className='question_buttons'>
                <button><i className="fa-solid fa-thumbs-up"></i><span>{val > 99?"99+":val}</span></button>
                <button><i className="fa-solid fa-thumbs-down"></i><span id='question_downvote'>{val > 99?"99+":val}</span></button>
            </div>
    </div>
  )
}

export default QuestionMain