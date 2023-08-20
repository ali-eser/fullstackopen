import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.increase}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => (
  <div>
    {props.value}
  </div>
)

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad;
  const score = (good * 1) + (neutral * 0) + (bad * (-1))
  const percentage = (good / all) * 100

  if (all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>
                <StatisticLine value={good} />
              </td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>
                <StatisticLine value={neutral} />
              </td>
            </tr>
            <tr>
              <td>bad</td>
              <td>
                <StatisticLine value={bad} />
              </td>
            </tr>
            <tr>
              <td>all</td>
              <td>
                <StatisticLine value={all} />
              </td>
            </tr>
            <tr>
              <td>average</td>
              <td>
                <StatisticLine value={(score / all)} />
              </td>
            </tr>
            <tr>
              <td>percentage</td>
              <td>
                <StatisticLine name={'percentage'} value={percentage} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} increase={() => setGood(good + 1)} />
      <Button text={'neutral'} increase={() => setNeutral(neutral + 1)} />
      <Button text={'bad'} increase={() => setBad(bad + 1)} />

      <h1>statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App
