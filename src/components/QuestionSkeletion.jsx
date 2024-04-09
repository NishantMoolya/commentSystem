import React from 'react'
import '../styles/questionskeleton.css'

const QuestionSkeletion = () => {
    return (
        <div class="skeleton">
            <div class="wrapper">
                <div class="circle"></div>
                <div class="line-1"></div>
                <div class="line-2"></div>
                <div class="line-3"></div>
                <div class="line-4"></div>
            </div>
        </div>
    )
}

export default QuestionSkeletion