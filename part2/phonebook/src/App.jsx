import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import PeopleList from "./components/PeopleList.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        event.preventDefault();
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                persons={persons}
                setShowAll={setShowAll}
                setSearch={setSearch}
            />
            <PersonForm
                persons={persons}
                handleNumberChange={handleNumberChange}
                handleNameChange={handleNameChange}
                setNewName={setNewName}
                setPersons={setPersons}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <PeopleList persons={persons} showAll={showAll} />
        </div>
    )
}

export default App
