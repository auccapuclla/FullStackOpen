import React from 'react'

const Header = ( {course} ) =>  {
    return (
      <h1> {course} </h1>
    )
  }
  const Content = ( {parts} ) => {
    return(
      <div>
        { parts.map((part, i) => <Part key={i} part={part.name} exercise={part.exercises} /> )}
      </div>
    )
  } 
  const Total = ({ parts }) => {
    let sum = parts.reduce(function (a , b) { return a + b.exercises }, 0 )
    return(
      <p> <b> Number of exercises { sum } </b> </p>
    )
  }
  const Part =(props) => {
    return (
      <p> {props.part} {props.exercise} </p>
    )
  }
  const Course = ( { courses } ) => {
    return (
      courses.map((course, i) => 
      <div id={i}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div > )
    )
  }
export default Course