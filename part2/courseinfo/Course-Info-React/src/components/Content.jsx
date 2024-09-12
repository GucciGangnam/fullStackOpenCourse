// IMPORTS 
// Compoenents 
import { Part } from "./part"


// COMPONENT

export const Content = ({ course }) => {
    return (
        <div className="Content">



            {course.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}


        </div>
    )
}