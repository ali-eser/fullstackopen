import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))

  const random = () => {
    setSelected(parseInt(Math.random() * 8))
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const index = []
  const mostVotes = Math.max(...points)

  for (let i = 0; i < points.length; i++) {
    if (points[i] === mostVotes) {
      index.push(i);
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <button onClick={vote}>vote</button>
      <button onClick={random}>next anectode</button>
      <h2>Anecdote with the most votes</h2>
      {anecdotes[index[0]]}
      <br></br>
      has {points[index[0]]} votes
    </div>
  )
}

export default App