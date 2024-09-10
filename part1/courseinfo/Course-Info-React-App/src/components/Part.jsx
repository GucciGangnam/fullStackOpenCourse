// IMPORTS 


// COMPONENT 
export const Part = ({part}) => {
    return (
        <div className="Part">
            <p>{part.name}</p>
            <p>{part.exercises}</p>
        </div>
    )
}