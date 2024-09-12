
// IMPORTS 
// Styles 
import "./App.css"
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '123456789'
    }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Handle change name 
  const handleChangename = (e) => {
    setNewName(e.target.value)
  }
// handle chnage number
const handleChangeNumber = (e) => { 
  setNewNumber(e.target.value)
}

  // SUbmit new name 
  const submitName = (e) => {
    e.preventDefault();
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const updatedPersons = [...persons, { name: newName, number: newNumber }];
    setPersons(updatedPersons);
    setNewName('');
    setNewNumber('')
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
          number: <input
            placeholder="Type number here"
            value={newNumber}
            onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}
          
        </p>
      ))}
    </div>
  )
}

export default App