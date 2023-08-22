import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName
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
                    <button type="submit">add</button>
                </div>
                <div>debug: {newName}</div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person =>  <li key={person.name}>{person.name}</li>)}
            </ul>
        </div>
    )
}

export default App
