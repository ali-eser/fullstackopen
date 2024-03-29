import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote (state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    addAnecdote (state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const vote = object => {
  return async dispatch => {
    const anecdote = await anecdoteService.vote(object)
    dispatch(voteAnecdote(anecdote.id))
  }
}

export default anecdoteSlice.reducer