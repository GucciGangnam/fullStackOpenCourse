// IMPORTS 


// COMPONENT 
export const Part = ({part, exercises}) => {
    return (
        <div className="Part">
            <p>{part}</p>
            <p>{exercises}</p>
        </div>
    )
}