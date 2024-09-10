// IMPIRTS 


// COMPONENT 

export const Content = ({ data }) => {
    console.log(data)
    return (
        <div className="Content">
            <p>{data.part1}</p>
            <p>{data.exercises1}</p>
            <p>{data.part2}</p>
            <p>{data.exercises2}</p>
            <p>{data.part3}</p>
            <p>{data.exercises3}</p>
        </div>
    )
}