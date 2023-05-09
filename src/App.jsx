import { useState, useEffect } from 'react'
import './App.css'

import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

import Question from './components/question'
import { shuffleArray } from './components/utils'



function App() {
  const [questions, setQuestions] = useState([])
  const [isButtonClicked, setIsButtonClicked] = useState(false)


  useEffect(() => {
    async function getQuestion() {
      const res = await fetch('https://opentdb.com/api.php?amount=4&category=18&difficulty=easy')
      const data = await res.json()
      setQuestions(data.results?.map((data) => {



        return (
          {
            question: decode(data.question),
            correct_answer: decode(data.correct_answer),
            isCorrect: false,
            isSelected: false,
            answers: shuffleArray([
              ...data.incorrect_answers.map(answer => ({

                id: nanoid(),
                answer: decode(answer),
                isAnswerSelected: false

              })),
              {

                id: nanoid(),
                answer: decode(data.correct_answer),
                isAnswerSelected: false,
                correct: true

              }
            ]),
            questionId: nanoid()
          }
        )
      }))

    }
    getQuestion()
  }, [])


  function handleAnswerSelection(id, selectedAnswer) {

    setQuestions(oldQuestions => oldQuestions.map(question => {

      if (question.questionId === id) {




        //USED TO ADD CLASS TO SELECTED ANSWER
        question.answers.map(answer => {

          if (selectedAnswer.id === answer.id) {
            answer.isAnswerSelected = true
          } else {
            answer.isAnswerSelected = false

          }
        })




        //USED TO ENABLE SHOW AMSWERS BTN
        question.isSelected = true


        //USED TO UPDATE THE SCORE
        if (selectedAnswer.answer === question.correct_answer) {
          return {
            ...question,
            isCorrect: true
          }
        } else {

          return {
            ...question,
            isCorrect: false
          }

        }


      } else {
        return question;
      }

    }))


  }








  const score = questions.filter(question => question.isCorrect).length

  // TO enaable the BTn only when all answers are selected
  const isAllSelected = questions.filter(question => question.isSelected).length === 4 ? true : false


  function showAnswers() {
    setIsButtonClicked(true)
  }

  console.log(isButtonClicked)




  const [isStartQuiz, setIsStartQuiz] = useState(false)

  function startQuiz() {
    setIsStartQuiz(true)
  }




  return (
    <div className='main--container'>
      {isStartQuiz ? <div>
        <span className='blobYellow'><img className='blobYellow' src='/blobs-1.svg' /></span>
        <div className='questions--container'>
          {
            questions?.map((question, index) => {
              return <Question
                key={index}
                question={question.question}
                correct_answer={question.correct_answer}
                questionId={question.questionId}
                answers={question.answers}
                handleAnswerSelection={handleAnswerSelection}
                isButtonClicked={isButtonClicked}
              />
            })
          }
        </div>
        <div className='bottom-bar'>
          {isButtonClicked ? <div className='score'>You scored {score}/{questions.length} correct answers</div> : ''}
          {!isButtonClicked ? <button className='btn-checkAnswers' disabled={isAllSelected ? false : true} onClick={showAnswers}>CheckAnswers</button> : <button className='btn-playAgain' onClick={() => location.reload()}>Play again</button>}
        </div>
        <img className='blobBlue' src='/blobs.svg' />
      </div> : ''}
      {!isStartQuiz ? <div className='startPage'>
                         <img className='blobYellow' src='/blobs-1.svg' />
                        <h1 className='startHeader'>Quizzical</h1>
                        <button className='btn-startQuiz ' onClick={startQuiz}>Start quiz</button>
                         <img className='blobBlue' src='/blobs.svg' />

                      </div> : ''}

    </div>
  )
}

export default App
