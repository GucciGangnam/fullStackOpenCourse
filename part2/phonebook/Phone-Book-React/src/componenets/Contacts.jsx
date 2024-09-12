// IMPORTS 


// COMPONENETS 
export const Contacts = ({ persons }) => {
    return (
        <div className="Contacts">
                  <h2>Numbers</h2>
            {persons.map((person) => (
                <p key={person.name}>
                    {person.name}: {person.number}
                </p>
            ))}
        </div>
    )
}