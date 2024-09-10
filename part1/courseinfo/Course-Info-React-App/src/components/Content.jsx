// IMPORTS 
// Componenets
import { Part } from "./Part"




// COMPONENT 

export const Content = ({ parts }) => {
    console.log(parts)
    return (
        <div className="Content">
            <Part part={parts[0]} />
            <Part part={parts[1]} />
            <Part part={parts[2]} />
        </div>
    )
}