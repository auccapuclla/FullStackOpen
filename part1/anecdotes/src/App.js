import { useState } from 'react'
const Title = (props) => { return( <h1> {props.name} </h1> ) }

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}> {props.name} </button>
  )
}

const Anecdote = (props) => { return ( <p> {props.anecdote} </p> ) }
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ] 
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})
  
  const updatePoints = () => {
    const copy = {...points}
    !copy.hasOwnProperty(selected) ? copy[selected] = 1 : copy[selected] += 1
    setPoints(copy)
    
  }
  return (
    <div>
      <Title name="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <Button name="gaaa" clickHandler={ ()=>{updatePoints()} } />
      <Button name="next anecdote" clickHandler={()=>{
                                    setSelected(Math.floor((anecdotes.length)*Math.random()))}} />
      <Title name="Anecdote with most votes" />
      <Anecdote anecdote={ Object.keys(points).length===0  ? "Please vote for at least one anecdote" : 
                          anecdotes[Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b)] } />
    </div>
  )
}

export default App