import { useState } from 'react'
// Styles 
import "./App.css"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // BUtton Handlers 
  const handleIncreaseGood = () => {
    setGood((prev) => (prev + 1))

  }
  const handleIncreaseNeutral = () => {
    setNeutral((prev) => (prev + 1))

  }
  const handleIncreaseBad = () => {
    setBad((prev) => (prev + 1))

  }

  return (

    <div className='App'>
      <button onClick={handleIncreaseGood}> Good </button>
      <button onClick={handleIncreaseNeutral}> Neutral </button>
      <button onClick={handleIncreaseBad}> Bad </button>

      <div className='Results'>
        <h1> Votes </h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>

        <h1> Statistics </h1>
        <p>Total Votes: {good + neutral + bad}</p>
        <p>Average: {((good - bad) / (good + neutral + bad || 1)).toFixed(2)}</p>
        <p>Positive percent: {(good / (good + neutral + bad || 1) * 100).toFixed(2)} %</p>

      </div>
    </div>
  )
}

export default App