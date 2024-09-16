// IMPORTS
// React
import { useState, useEffect } from "react";



// COMPONENET 
export const Search = ({ countries, setSearchResults, searchInput, setSearchInput }) => {

    // Search input 

    // Handle change search input
    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    // UE to filter out countries that contain serahc result into new array 
    useEffect(() => {
        const filteredCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchResults(filteredCountries)
    }, [countries, searchInput, setSearchResults])


    return (
        <div className="Search">
            <h1>Find a country</h1>
            <input
                placeholder="Start typing..."
                value={searchInput}
                onChange={handleChangeSearchInput}
            />
        </div>
    )
}