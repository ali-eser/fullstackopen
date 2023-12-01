const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER': 
      return action.payload
    default:
      return state
  }
}

export const filterAnecdote = (text) => {
  return {
    type: 'FILTER',
    payload: text
  }
}

export default filterReducer