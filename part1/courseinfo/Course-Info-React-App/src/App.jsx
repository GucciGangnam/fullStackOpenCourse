import { useState } from 'react'
// Styles 
import "./App.css"
// Compoennets 
import { Results } from './components/Results'

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

      <Results good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App