import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from './components/Button'
import Anecdote from './components/Anecdote'
import Header from './components/Header'
import MostVoted from './components/MostVoted'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Tengo un michi que muerde mucho y no le gusta ir al veterinario ya que se caga en el transportín'
]

const App = () => {
  const [selected, setSelected] = useState(0)
  //Genera un estado en forma de array con las posiciones de los textos existentes
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    const random = Math.floor(Math.random() * (anecdotes.length));
    setSelected(random);
  }

  const handleVote = () => {
    const newAllVotes = [...vote]
    newAllVotes[selected] += 1
    setVote(newAllVotes);
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote selected={anecdotes[selected]} />
      <Button click={handleClick} name="Next anecdote" />
      <Button click={handleVote} name="Vote" />
      <Header text="Anecdote with most votes" />
      <MostVoted anecdote={anecdotes} votes={vote} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)