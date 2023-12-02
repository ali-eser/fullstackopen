import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => 
  axios.get(baseUrl).then(response => response.data)

export const createAnecdote = anecdote => 
  axios.post(baseUrl, anecdote).then(response => response.data)

export const voteAnecdote = anecdote => 
  axios.put(`${baseUrl}/${anecdote.id}`, { 
    content: anecdote.content, 
    votes: anecdote.votes + 1 
  }).then(response => response.data)