// IMPORTS 
// Componenets
import { Part } from "./Part"




// COMPONENT 

export const Content = ({ data }) => {
    console.log(data)
    return (
        <div className="Content">
            <Part part={data.part1} />
            <Part part={data.part2} />
            <Part part={data.part3} />
        </div>
    )
}