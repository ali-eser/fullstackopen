import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ filter, anecdotes })=> {
    console.log(anecdotes)
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

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default AnecdoteList