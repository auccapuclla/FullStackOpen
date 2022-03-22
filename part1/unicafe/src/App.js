import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}> {props.option} </button>
  )
}

const Title = ({name}) => {
  return(
    <h1> <bold> {name} </bold> </h1>
  )
}
const Result = (props) => {
  return (
         <tr>
            <td>{props.option}</td>
            <td>{props.result}</td>
         </tr>
  )
}

const Statistics = (props) => {
  let average = 1*props.good + 0*props.neutral + (-1)*props.bad
  let total = props.good + props.neutral + props.bad
  let positivity = props.good/total *100 || 0
  if ( total === 0){
    return(
      <p>No feedback given</p>
    )
  }
  else{
    return (
      <table>
        <Result option="good" result={props.good}/>
        <Result option="neutral" result={props.neutral}/>
        <Result option="bad" result={props.bad}/>
        <Result option="total" result={total}/>
        <Result option="average" result={average}/>
        <Result option="positivity" result={positivity + "%"}/>
      </table>
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
      <Title name="give feedback" />
      <Button option="good" handleClick={ ()=> setGood(good+1)} />
      <Button option="neutral" handleClick={ ()=> setNeutral(neutral+1)} />
      <Button option="bad" handleClick={ ()=> setBad(bad+1)} />
      <Title name="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App