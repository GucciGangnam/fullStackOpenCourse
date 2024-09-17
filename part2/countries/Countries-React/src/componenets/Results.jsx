// IMPORTS 
// React 
import { useState, useEffect } from "react";
import axios from "axios";
// Variables 
const api_key = import.meta.env.VITE_WEATHER_API_KEY

// COMPONENET 
export const Results = ({ searchResults, selectCountry }) => {

    const [onlyOneResult, setOnlyOneResult] = useState(false);

    const [weatherInfo, setWeatherInfo] = useState({});

    // UE to update OOR to tru when 1 result and F when not 

    useEffect(() => {
        if (searchResults.length === 1) {
            setOnlyOneResult(true);
            axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${searchResults[0].name.common}&aqi=no`)
                .then(result => setWeatherInfo(result.data))

        } else {
            setOnlyOneResult(false);
            setWeatherInfo({})
        }
    }, [searchResults])


    return (
        <div className="Results">

            {(searchResults.length === 0) ? (
                <p>No results found</p>
            ) : (searchResults.length === 1) ? (
                <div key={searchResults[0].name.common} className="Single-Country">
                    <div className="Header">
                        <div className="Name">
                            {searchResults[0].name.common}
                        </div>
                        <div className="Flag">
                            {searchResults[0].flag}
                        </div>
                    </div>

                    <div className="Capital">
                        Capital: {searchResults[0].capital}
                    </div>
                    <div className="Area">
                        Area: {searchResults[0].area} km2
                    </div>
                    <div className="Languages">
                        Languages:
                        <ul>
                            {Object.values(searchResults[0].languages).map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="Weather">
                        <p>Weather in {searchResults[0].capital}</p>
                        <p>  {weatherInfo?.current?.condition?.text || 'Weather information not available'}</p>
                        <p>  {weatherInfo?.current?.temp_c || 'Weather information not available'} c</p>
                        <img src={weatherInfo?.current?.condition?.icon}/> 
                    </div>
                </div>
            ) : (searchResults.length > 249) ? (
                <p>Results will be displayed here</p>
            ) : (searchResults.length < 11) ? (
                searchResults.map((country) => (
                    <div key={country.name.common} className="Country">
                        {country.name.common}
                        <button
                            onClick={() => { selectCountry(country.name.common) }}>Show</button>
                    </div>
                ))
            ) : (
                <p>Too many results to show</p>
            )}



        </div>
    )
}