import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    console.log('add', anecdote)
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`you added "${anecdote.content}"`))
    setTimeout(() => dispatch(setNotification('')), 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm