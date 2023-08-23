const PersonForm = (props) => {
    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: props.newName,
            number: props.newNumber,
            id: props.persons.length + 1,
            show: false
        };
        for (let i = 0; i < props.persons.length; i++) {
            if (props.persons[i].name === personObject.name) {
                alert(`${props.newName} is already added to phonebook`)
                break
            } else {
                props.setPersons(props.persons.concat(personObject));
            }
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