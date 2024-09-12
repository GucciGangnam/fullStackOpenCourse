// IMPORTS 
// Compoenents 
import { Part } from "./part"


// COMPONENT

export const Content = ({ course }) => {


    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div className="Content">

            {course.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}

            {total}

        </div>
    )
}