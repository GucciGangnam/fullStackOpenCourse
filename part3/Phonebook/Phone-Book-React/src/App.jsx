
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

  // STATES 
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrMsg] = useState('');
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
  const submitName = async (e) => {
    e.preventDefault();
    const nameExists = persons.some(person => person.name === newName);

    // Ask to update number
    if (nameExists) {
      let existingContact = persons.find(person => person.name === newName);
      console.log(existingContact);
      let updatedContact = { ...existingContact, number: newNumber };

      if (window.confirm("This contact already exists. Do you want to update the number?")) {
        console.log("number updated");
        personServices.update(existingContact.id, updatedContact)
          .then(() => {
            console.log("updating front......");
            // Update the persons array, replacing the updated contact
            let updatedPersons = persons.map(person =>
              person.id === existingContact.id ? updatedContact : person
            );
            setPersons(updatedPersons); // Assuming you're using React state
            setIsFeedback(true)
            setFeedbackMsg("Contact updated sucesfully")
            setTimeout(() => {
              setFeedbackMsg("")
              setIsFeedback(false)
            }, 2000)
          })
          .catch(error => {
            console.error('Error updating contact:', error);
            setIsError(true)
            setErrMsg("Error updating contact:")
            setTimeout(() => {
              setIsError(false)
              setErrMsg("")
            }, 2000)
          });
      }
      return;
    }



    try {
      const createdPerson = await personServices.create({ name: newName, number: newNumber });
      setNewName('');
      setNewNumber('');
      setIsFeedback(true);
      setFeedbackMsg("Contact updated successfully");
      const updatedPersons = [...persons, createdPerson];
      setPersons(updatedPersons);
      setTimeout(() => {
        setFeedbackMsg('');
        setIsFeedback(false);
      }, 2000);
    } catch (error) {
      setErrMsg(error.response.data.error);
      setIsError(true);
      
      setTimeout(() => {
        setErrMsg('');
        setIsError(false);
      }, 2000);
  
      console.error("Error adding person:", error);
    }

  };

  // DELETE CONTACT 
  const deleteContact = (id) => {
    console.log(id);
    // Call the service to delete the person from the database
    if (window.confirm("Are you sure you want to delete this contact?")) {
      personServices.remove(id)
        .then(() => {
          // Filter out the deleted person from the list
          const updatedPersons = persons.filter(person => person.id !== id);
          setPersons(updatedPersons); // Assuming you're using React's state hook
          setIsFeedback(true)
          setFeedbackMsg("Contact deleted sucesfully")
          setTimeout(() => {
            setFeedbackMsg("")
            setIsFeedback(false)
          }, 2000)
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
          setIsError(true)
          setErrMsg("This user has already been deleted")
          setTimeout(() => {
            setIsError(false)
            setErrMsg("")
          }, 2000)
        });
    }
  }



  // RETURN //
  return (
    <div className='App'>

      {isFeedback && (
        <div className="Feedback">
          {feedbackMsg}
        </div>
      )}

      {isError && (
        <div className="Error">
          {errorMsg}
        </div>
      )}




      <h2>Phonebook</h2>
      <Form submitName={submitName} newName={newName} handleChangename={handleChangename} handleChangeNumber={handleChangeNumber} newNumber={newNumber} />

      <Search searchInput={searchInput} handleChangeSearchInput={handleChangeSearchInput} searchResult={searchResult} />


      <Contacts persons={persons} deleteContact={deleteContact} />

    </div>
  )
}

export default App