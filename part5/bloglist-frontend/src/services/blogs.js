import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3003'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }