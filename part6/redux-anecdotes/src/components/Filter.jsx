import { useDispatch } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    dispatch(filterAnecdote(event.target.value))
  }

  const style = {
    marginBottom: 15
  }

  return (
    <div style={style}>
      filter
      <input type="text" name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter