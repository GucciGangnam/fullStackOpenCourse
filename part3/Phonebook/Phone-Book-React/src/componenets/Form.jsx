// IMPORTS 


// COMPONENTS 
export const Form = ({submitName, newName, handleChangename, handleChangeNumber, newNumber}) => {
    return (
        <form
            onSubmit={submitName}>
                <h2>Add new contact</h2>
            <div>
                name: <input
                    placeholder="Type name here"
                    value={newName}
                    onChange={handleChangename} />
            </div>
            <div>
                number: <input
                    placeholder="Type number here"
                    value={newNumber}
                    onChange={handleChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}