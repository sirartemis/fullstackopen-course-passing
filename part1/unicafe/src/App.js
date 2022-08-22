import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = () => 100 * (good / all) || 0

  if ( good || bad || neutral) return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average()} />
          <StatisticLine text='positive' value={`${positive()}%`} />
        </tbody>
      </table>
    </>
  )
  return <p>No feedback given</p>
}

const App = () => {

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

export default App
