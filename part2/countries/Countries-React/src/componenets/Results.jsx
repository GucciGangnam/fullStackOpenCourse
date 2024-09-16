// IMPORTS 



// COMPONENET 
export const Results = ({ searchResults }) => {
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

                </div>
            ) : (searchResults.length > 249) ? (
                <p>Results will be displayed here</p>
            ) : (searchResults.length < 11) ? (
                searchResults.map((country) => (
                    <div key={country.name.common} className="Country">
                        {country.name.common}
                    </div>
                ))
            ) : (
                <p>Too many results to show</p>
            )}



        </div>
    )
}