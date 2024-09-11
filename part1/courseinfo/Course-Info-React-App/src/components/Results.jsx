// IMPORTS 


// COMPONENETS 

export const Results = ({ good, neutral, bad }) => {
    return (
        <div className="Results">
            <div className='Results'>
                <h1> Votes </h1>
                <p>Good: {good}</p>
                <p>Neutral: {neutral}</p>
                <p>Bad: {bad}</p>

                <h1> Statistics </h1>
                <p>Total Votes: {good + neutral + bad}</p>
                <p>Average: {((good - bad) / (good + neutral + bad || 1)).toFixed(2)}</p>
                <p>Positive percent: {(good / (good + neutral + bad || 1) * 100).toFixed(2)} %</p>

            </div>
        </div>
    )
}