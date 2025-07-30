export default function Search({ searchField, setSearchField }) {
    return (
        <>
            <span>Search</span>
            <input
                className="search"
                type="text"
                placeholder="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
            />
        </>
    )
}
