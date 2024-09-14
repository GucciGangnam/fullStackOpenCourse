
// IMPORTS 
// Styles 
import "./App.css"
// React
import { useEffect, useState } from 'react'
// Componenets 
import { Form } from "./componenets/Form"
import { Search } from "./componenets/Search"
import { Contacts } from "./componenets/Contacts"
import axios from "axios"


const App = () => {
  const [persons, setPersons] = useState([])
  // UE to fetch persons from server on mount: 
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  }, [])


  // SEARCH 
  const [searchResult, setSearchResult] = useState([])
  const [searchInput, setSearchInput] = useState('');
  // Handle change search input 
  const handleChangeSearchInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    console.log(inputValue);
    if (inputValue === '') {
      setSearchResult([]);
      return;
    }
    const updatedSearchResults = persons.filter(person =>
      person.name.toLowerCase().startsWith(inputValue)
    );
    setSearchResult(updatedSearchResults);
  };


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
      <Form submitName={submitName} newName={newName} handleChangename={handleChangename} handleChangeNumber={handleChangeNumber} newNumber={newNumber} />

      <Search searchInput={searchInput} handleChangeSearchInput={handleChangeSearchInput} searchResult={searchResult} />


      <Contacts persons={persons} />

    </div>
  )
}

export default App