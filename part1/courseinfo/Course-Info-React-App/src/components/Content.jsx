// IMPORTS 
// Componenets
import { Part } from "./Part"




// COMPONENT 

export const Content = ({ data }) => {
    console.log(data)
    return (
        <div className="Content">
            <Part part={data.part1} exercises={data.exercises1}/>
            <Part part={data.part2} exercises={data.exercises2}/>
            <Part part={data.part3} exercises={data.exercises3}/>
        </div>
    )
}