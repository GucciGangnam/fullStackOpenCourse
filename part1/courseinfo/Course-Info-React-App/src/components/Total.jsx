// IMPPRTS 

// COMPONENT 
export const Total = ({data}) => {
    return (
        <div className="Total">
            Total number of exercises : {(data.part1.exercises + data.part2.exercises + data.part3.exercises)}
        </div>
    )
}