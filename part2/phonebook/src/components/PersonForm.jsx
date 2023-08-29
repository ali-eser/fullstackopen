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
                        .then(response => {
                            personService
                                .getAll()
                                .then(response => {
                                    props.setPersons(response.data)
                                })
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
                })
        }

        props.setNewName('');
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