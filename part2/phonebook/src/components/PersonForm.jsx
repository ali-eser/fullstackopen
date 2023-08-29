import personService from '../services/persons'

const PersonForm = (props) => {
    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: props.newName,
            number: props.newNumber,
            id: props.persons.length + 1,
            show: false
        };

        let isInPhonebook = false;

        for (let i = 0; i < props.persons.length; i++) {
            if (props.persons[i].name === personObject.name) {
                isInPhonebook = true;
                if (confirm(`${props.persons[i].name} is already added to the phonebook, replace the old number with the new one?`)) {
                    personService
                        .update(props.persons[i].id, personObject)
                        .then(() => { 
                            personService
                                .getAll()
                                .then(response => {
                                    props.setPersons(response.data)
                                })
                            props.setIsPositive(true)
                            props.setMessage(`Updated the number of ${personObject.name}.`)
                            setTimeout(() => {
                                props.setMessage(null)
                            }, 5000)
                        })
                        .catch(() => {
                            props.setIsPositive(false)
                            props.setMessage(`Information of ${personObject.name} has already been deleted from the phonebook.`)
                            setTimeout(() => {
                                props.setMessage(null)
                            }, 5000)
                        })
                }
                break
            }
        }

        if (isInPhonebook === false) {
            personService
                .create(personObject)
                .then(response => {
                    props.setPersons(props.persons.concat(response.data))
                    props.setMessage(`${personObject.name} has been added to the phonebook.`)
                    setTimeout(() => {
                        props.setMessage(null)
                    }, 5000)
                })
        }

        props.setNewName('');
        props.setNewNumber('');
    }

    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={props.handleNameChange} />
                </div>
                <div>
                    number: <input onChange={props.handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
                <div>debug: </div>
            </form>
        </div>
    )
}

export default PersonForm