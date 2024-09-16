// IMPORTS 


// COMPONENETS 
export const Contacts = ({ persons, deleteContact }) => {
    return (
        <div className="Contacts">
            <h2>Numbers</h2>
            {persons.map((person) => (
                <div key={person.name} className="Contact">
                    <div className="Left">
                        <p>{person.name}</p>
                        <p>{person.number}</p>
                    </div>
                    <button
                    onClick={() => { deleteContact(person.id)}}>Delete</button>
                </div>
            ))}
        </div>
    )
}