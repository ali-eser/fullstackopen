const Filter = (props) => {
    const setSearch = props.setSearch
    const setShowAll = props.setShowAll
    const persons = props.persons

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase())
        for (let i = 0; i < persons.length; i++) {
            persons[i].show = persons[i].name.toLowerCase().includes(event.target.value.toLowerCase());
        }
        if (event.target.value.length > 0) {
            setShowAll(false);
        } else {
            setShowAll(true);
        }
    }

    return (
        <div>
            filter shown with <input onChange={handleSearch} />
        </div>
    )
}

export default Filter