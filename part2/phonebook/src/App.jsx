import { useState } from 'react'

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

    const handleSearch = (event) => {
        event.preventDefault()
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

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
            show: false
        };
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === personObject.name) {
                alert(`${newName} is already added to phonebook`)
                break
            } else {
                setPersons(persons.concat(personObject));
            }
        }
        setNewName('');
    }

    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.show === true)

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with <input onChange={handleSearch} />
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handleNameChange} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
                <div>debug: </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person =>
                    <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}

export default App
