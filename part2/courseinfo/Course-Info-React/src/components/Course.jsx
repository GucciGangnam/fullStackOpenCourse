//IMPORTS 

// Compoennet 
import { Part } from "./part";


//COMPONENET
export const Course = ({ course }) => {

    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <div className="Course">

            <h2>{course.name}</h2>

            {course.parts.map((part) => (
                <Part
                    key={part.id}
                    part={part} />
            ))}

            <strong>Total exercises: {total}</strong>

        </div>
    )
}