// IMPPRTS 

// COMPONENT 
export const Total = ({parts}) => {
    return (
        <div className="Total">
            Total number of exercises : {(parts[0].exercises + parts[1].exercises + parts[2].exercises)}
        </div>
    )
}