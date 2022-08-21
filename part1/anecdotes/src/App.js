import { useState } from "react"

const MostVotes = ({anecdote, votes}) => (
  <>
  <h1>Anecdote with most votes</h1>
  <p>{anecdote}</p>
  <p>has {votes} {(votes === 1) ? 'vote' : 'votes'}</p>
  </>
)

const App = () => {

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
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} {(votes[selected] === 1) ? 'vote' : 'votes'}</p>
      <button onClick={vote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
      <MostVotes anecdote={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} /> 
    </div>
  )
}

export default App