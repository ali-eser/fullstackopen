import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => 
  axios.get(baseUrl).then(response => response.data)