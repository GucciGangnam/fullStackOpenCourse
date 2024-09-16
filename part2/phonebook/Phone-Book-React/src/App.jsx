
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
// Services 
import personServices from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  // UE to fetch persons from server on mount:

  useEffect(() => {
    personServices
      .getAll()
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

// ADD NEW PERSON
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
  // Submit new name 
  const submitName = (e) => {
    e.preventDefault();
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const updatedPersons = [...persons, { name: newName, number: newNumber }];
    setPersons(updatedPersons);

    // Update person in backend 
    personServices
    .create({ name: newName, number: newNumber })

    setNewName('');
    setNewNumber('')


  };



  // RETURN //
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