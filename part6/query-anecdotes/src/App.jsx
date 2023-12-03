import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, voteAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useNotificationDispatch } from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote))
      dispatch({ type: 'SET', payload: `voted for ${updatedAnecdote.content}` })
      setTimeout(() => notificationDispatch({ type: 'SET', payload: '' }), 5000)
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 2
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.status === 'error') {
    return <div>service not available</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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

export default App
