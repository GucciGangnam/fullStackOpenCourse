
// IMPORTS 
// Styles 
import "./App.css"
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  // Handle change name 
  const handleChangename = (e) => {
    setNewName(e.target.value)
  }

  // SUbmit new name 
  const submitName = (e) => {
    e.preventDefault();
    
    const nameExists = persons.some(person => person.name === newName);
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
  
    const updatedPersons = [...persons, { name: newName }];
    setPersons(updatedPersons);
    setNewName('');
  };

  return (
    <div className='App'>
      <h2>Phonebook</h2>

      <form
        onSubmit={submitName}>
        <div>
          name: <input
            placeholder="Type name here"
            value={newName}
            onChange={handleChangename} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name}
        </p>
      ))}
    </div>
  )
}

export default App