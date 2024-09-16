// IMPORTS 
// Styles
import './App.css'
// React 
import { useState, useEffect } from 'react'
// Services 
import { getAll } from './services/countries'

// Pages 

// Compoenenst 
import { Search } from './componenets/Search'
import { Results } from './componenets/Results'

function App() {

  // States 
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // UE to fetch all countries into state on mount 
  useEffect(() => {
    (async () => {
      try {
        const result = await getAll();
        setCountries(result);
      } catch (error) {
        console.error('Error in useEffect', error);
      }
    })();
  }, []);


  return (
    <div className='App'>
      <Search countries={countries} setSearchResults={setSearchResults} />
      <Results countries={countries} searchResults={searchResults} />
    </div>
  )
}

export default App
