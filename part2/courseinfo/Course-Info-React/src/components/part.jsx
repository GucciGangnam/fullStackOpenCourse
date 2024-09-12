// IMPORTS 


// COMPOENENT 

export const Part = ({part}) => {
    return (
        <div className="Part">
            <p>{part.name}: {part.exercises}</p>
        </div>
    )
}