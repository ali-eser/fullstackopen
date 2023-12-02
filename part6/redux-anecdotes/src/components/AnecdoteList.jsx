import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { defineNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import Notification from './Notification'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    anecdotes = [...anecdotes]
    if (filter === '') {
      return anecdotes.sort((a, b) => (b.votes - a.votes))
    } else {
      return anecdotes.filter(anecdote => {
        if (anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
          return anecdote
        }
      })
    }
  })

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(defineNotification(`you voted for "${anecdote.content}"`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default AnecdoteList