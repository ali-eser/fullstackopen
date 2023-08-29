import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from "./components/Filter.jsx";
import Notification from './components/Notification.jsx';
import PeopleList from "./components/PeopleList.jsx";
import PersonForm from "./components/PersonForm.jsx";
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [message, setMessage] = useState('');
    const [isPositive, setIsPositive] = useState(true)

    useEffect(() => {
        personService
            .getAll()
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
            <Notification message={message} isPositive={isPositive} />
            <Filter
                persons={persons}
                setShowAll={setShowAll}
                setSearch={setSearch}
            />
            <h2>add a new</h2>
            <PersonForm
                persons={persons}
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                handleNumberChange={handleNumberChange}
                handleNameChange={handleNameChange}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                setPersons={setPersons}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <PeopleList 
                persons={persons} 
                showAll={showAll} 
                setPersons={setPersons} 
                setMessage={setMessage} 
                setIsPositive={setIsPositive} 
            />
        </div>
    )
}

export default App
