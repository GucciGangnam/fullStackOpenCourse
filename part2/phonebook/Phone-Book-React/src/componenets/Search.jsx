// IMPORTS 


// COMPOENENT
export const Search = ({searchInput, handleChangeSearchInput, searchResult}) => {
    return (
        <div className="Search">
                  <h2> Search </h2>
            <input
                placeholder="Search Name"
                value={searchInput}
                onChange={handleChangeSearchInput}
            />
            {searchResult.map((result) => (
                <p key={result.name}>{result.name}: {result.number}</p>
            ))}
        </div>
    )
}