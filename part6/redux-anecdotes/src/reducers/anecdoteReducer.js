const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


// Action creator for voting
export const voteAnecdote = (id) => {
  return {
    type: 'INCREMENT',
    data: { id }
  }
}

// Action creator for adding a new anecdote
export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: { content }
  }
}

// Reducer
const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'ADD_ANECDOTE': {
      const newAnecdote = {
        content: action.data.content,
        id: getId(),
        votes: 0
      }
      return [...state, newAnecdote]
    }
    default:
      console.error("That dispatch method isnt built yet")
      return state
  }
}

export default anecdoteReducer