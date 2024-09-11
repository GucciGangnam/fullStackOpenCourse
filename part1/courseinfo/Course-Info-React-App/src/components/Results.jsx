// IMPORTS 


// COMPONENETS 

export const Results = ({ good, neutral, bad }) => {
    return (

        <div className='Results'>
            {(good === 0) && (neutral === 0) && (bad === 0) ? (
                <>
                    <p>
                        No feedback given.  Click a button to submit feedback.
                    </p>
                </>
            ) : (
                <>
                    <h1>Votes</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Good:</td>
                                <td>{good}</td>
                            </tr>
                            <tr>
                                <td>Neutral:</td>
                                <td>{neutral}</td>
                            </tr>
                            <tr>
                                <td>Bad:</td>
                                <td>{bad}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h1>Statistics</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total Votes:</td>
                                <td>{good + neutral + bad}</td>
                            </tr>
                            <tr>
                                <td>Average:</td>
                                <td>{((good - bad) / (good + neutral + bad || 1)).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Positive Percent:</td>
                                <td>{(good / (good + neutral + bad || 1) * 100).toFixed(2)} %</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}