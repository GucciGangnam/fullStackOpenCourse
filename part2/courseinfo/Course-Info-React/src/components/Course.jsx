// IMPORTS 

// Compoennets 
import { Header } from "./Header"
import { Content } from "./Content"


// COMPONENT

export const Course = ({course}) => { 
    return(
        <div className="Course">
            <Header course={course}/>
            <Content course={course}/>
        </div>
    )
}