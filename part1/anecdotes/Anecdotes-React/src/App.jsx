import { useState } from 'react'
// Styles 
import "./App.css"

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      Text: 'If it hurts, do it more often.',
      Votes: 0
    },
    {
      Text: 'Adding manpower to a late software project makes it later!',
      Votes: 0
    },
    {
      Text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      Votes: 0
    },
    {
      Text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      Votes: 0
    },
    {
      Text: 'Premature optimization is the root of all evil.',
      Votes: 0
    },
    {
      Text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      Votes: 0
    },
    {
      Text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      Votes: 0
    },
    {
      Text: 'The only way to go fast, is to go well.',
      Votes: 0
    },
  ])






  const [selected, setSelected] = useState(0)
  // Handle Chnage Anncedote
  const handleNextAnnecdote = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
  }

  // Handle Vote for anecdote
  const vote = () => {
    const newAnecdotes = [...anecdotes];
    newAnecdotes[selected].Votes++;
    setAnecdotes(newAnecdotes);
  }

  // Fint top votes anecdote
  const topAnecdote = anecdotes.reduce((max, anecdote) => {
    return anecdote.Votes > max.Votes ? anecdote : max;
  }, anecdotes[0]);

  return (
    <div className='App'>
      <h1>Anecdotes</h1>
      <p>{anecdotes[selected].Text}</p>
      <h1>Votes</h1>
      <p>{anecdotes[selected].Votes}</p>
      <button onClick={vote}>Vote for this annecode</button>
      <button onClick={handleNextAnnecdote}>Next anecdote</button>

      <div className='Top-Voted'>
        <h2>
          Top votes anecdote:
        </h2>
        {topAnecdote.Votes === 0 ? (
          <p>No voted cast yes</p>
        ) : (
          <>
            <p>{topAnecdote.Text}</p>
            <p>Votes: {topAnecdote.Votes}</p>
          </>
        )}
      </div>
    </div >
  )
}

export default App