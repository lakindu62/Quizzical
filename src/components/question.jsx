import { useEffect, useState } from 'react'
import { shuffleArray } from './utils';





export default function Questions(props) {


    

    const { question, correct_answer , handleAnswerSelection , questionId , answers , isButtonClicked} = props
   

  
    return (
        <div>
            <div className='question'>{question}</div>
            <div className='answers'>
                {
                    
                        answers.map((answer, i) => (
                            <AnswerOption
                                handleAnswerSelection={handleAnswerSelection}
                                key={i}
                                answer={answer}
                                correct_answer={correct_answer}
                                questionId = {questionId}
                                isButtonClicked={isButtonClicked}
        
        
        
                            />
                        ))
                  
                
                
                }
            </div>
        </div>
    );

}

function AnswerOption(props) {
    
    const { answer, handleAnswerSelection, questionId , isButtonClicked} = props

    function handleClick() {
        handleAnswerSelection(questionId , answer)
        
    }


    return (
                                                                                                    //adding class to only the correct answers initally fetched
        <button onClick={handleClick} className={`${answer.isAnswerSelected ? "selected" : ''}
                                                  ${isButtonClicked && answer.correct ? "showAnswer" 
                                                  : isButtonClicked ? 'dim' 
                                                  :''} answersBtn ` }   >
                                                    
                                                    
                                                    {answer.answer}</button>
    )
}