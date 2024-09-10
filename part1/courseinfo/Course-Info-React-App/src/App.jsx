// IMPIRTDS 
// Styles 
import "./App.css"

// Components 
import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { Total } from "./components/Total"


const App = () => {

  const average = function (a, b) {
    return (a + b) / 2
  }

  const result = average(2, 5)
  // result is now 3.5
  console.log(result)



  // const-definitions
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content data={{part1, part2, part3}} />
      <Total data={{part1, part2, part3}} />
    </div>
  )
}

export default App