// IMPPRTS 

// COMPONENT 
export const Total = ({data}) => {
    return (
        <div className="Total">
            Total number of exercises : {(data.exercises1 + data.exercises2 + data.exercises3)}
        </div>
    )
}