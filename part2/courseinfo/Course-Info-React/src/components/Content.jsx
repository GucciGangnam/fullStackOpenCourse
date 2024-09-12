// IMPORTS 
// Compoenents 
import { Part } from "./part"


// COMPONENT

export const Content = ({ courses }) => {


    const total = courses.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div className="Content">

            {courses.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}

            {total}

        </div>
    )
}