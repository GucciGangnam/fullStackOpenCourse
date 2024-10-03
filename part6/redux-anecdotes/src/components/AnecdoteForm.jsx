import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.elements.anecdote.value
        dispatch(addAnecdote(content))
        event.target.reset() // clear the input field
    }

    return (
        <form onSubmit={handleAddAnecdote}>
            <h2>create new</h2>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm