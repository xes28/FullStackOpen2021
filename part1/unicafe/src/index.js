import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })


  const handleClickGood = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1
    })
  }

  const handleClickNeutral = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1
    })
  }

  const handleClickBad = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1
    })
  }

  return (
    <div>
      <Header name="Give Feedback" />
      <Button name="Good" click={handleClickGood} />
      <Button name="Neutral" click={handleClickNeutral} />
      <Button name="Bad" click={handleClickBad} />
      <Header name="Statistics" />
      <Statistics clicks={clicks} />
    </div >
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)