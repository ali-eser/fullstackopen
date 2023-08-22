import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567'}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        event.preventDefault();
        setNewNumber(event.target.value);
    }

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber
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

    return (
        <div>
            <h2>Phonebook</h2>
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
                <div>debug: {newName}</div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person =>
                    <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}

export default App
