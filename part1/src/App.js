import { useState } from "react"

/*************************************************

* Course information

**************************************************/


const Header = ({ course }) => <h1>{course}</h1> 

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {

  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )
}

const Total = ({ parts }) => {

  return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>

}

const CourseInformation = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

/*************************************************

* Course information end

**************************************************/



/*************************************************

* Unicafe

**************************************************/

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {

  const all = () => good + neutral + bad
  const average = () => good - bad > 0 ? good - bad : 0 // Sorry, I don't really understand how to calculate this
  const positive = () => good / (all() / 100) || 0

  if ( good || bad || neutral) return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all()} />
          <StatisticLine text='average' value={average()} />
          <StatisticLine text='positive' value={`${positive()}%`} />
        </tbody>
      </table>
    </>
  )
  return <p>No feedback given</p>
}

const Unicafe = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setClickHandler = ( handler, value ) => () => handler(value)
  
  return (
    <>
    <h1>give feedback</h1>
    <Button onClick={setClickHandler(setGood,good + 1)} text='good' />
    <Button onClick={setClickHandler(setNeutral,neutral + 1)} text='neutral' />
    <Button onClick={setClickHandler(setBad,bad + 1)} text='bad' />
    <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

/*************************************************

* Unicafe end

**************************************************/

/*************************************************

* Anecdotes

**************************************************/

const MostVotes = ({anecdote, votes}) => (
  <>
  <h1>Anecdote with most votes</h1>
  <p>{anecdote}</p>
  <p>has {votes} {(votes === 1) ? 'vote' : 'votes'}</p>
  </>
)

const Anecdotes = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected,setSelected] = useState(0)
  const [votes,setVotes] = useState([...anecdotes.map(() => 0)])

  const getRandomAnecdote = () => {
    const min = Math.ceil(0)
    const max = Math.floor(anecdotes.length)
    let generatedNumber = Math.floor(Math.random() * (max - min)) + min
    if (generatedNumber === selected) generatedNumber = getRandomAnecdote()
    return generatedNumber
  }

  const selectRandomAnecdote = () => setSelected(getRandomAnecdote())

  const vote = () => {
    setVotes([
    ...votes.slice(0,selected),
    votes[selected] + 1,
    ...votes.slice(selected + 1,votes.length)
  ])
  }

  const mostVotesIndex = votes.reduce((prev, next, index, arr) => next > arr[prev] ? index : prev, 0)

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} {(votes[selected] === 1) ? 'vote' : 'votes'}</p>
      <button onClick={vote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
      <MostVotes anecdote={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} /> 
    </div>
  )
}

/*************************************************

* Anecdotes end

**************************************************/

const ChooseExerciseButton = ({handler, exercise}) => <button onClick={exercise => handler(exercise)}>{exercise}</button>

const App = () => {

  const [exercise, setExercise] = useState('course information')

  const chooseExercise = exercise => setExercise(exercise)

  return (
    <div>
      <ChooseExerciseButton handler={() => chooseExercise('course information')} exercise={'course information'} />
      <ChooseExerciseButton handler={() => chooseExercise('unicafe')} exercise={'unicafe'} />
      <ChooseExerciseButton handler={() => chooseExercise('anecdotes')} exercise={'anecdotes'} />
      <hr />
      {(exercise === 'course information') && <CourseInformation />}
      {(exercise === 'unicafe') && <Unicafe /> }
      {(exercise === 'anecdotes') && <Anecdotes /> }
    </div>
  )
}

export default App