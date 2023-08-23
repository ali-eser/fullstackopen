import { useState } from 'react';
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import PeopleList from "./components/PeopleList.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567', id: 1, show: true },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, show: true },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3, show: true },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, show: true }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [showAll, setShowAll] = useState(true);

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
