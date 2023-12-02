import { useDispatch } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const style = {
    marginBottom: 15
  }

  return (
    <div style={style}>
      filter
      <input type="text" name="filter" onChange={(evt) => dispatch(filterAnecdote(evt.target.value))} />
    </div>
  )
}

export default Filter