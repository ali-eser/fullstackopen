import personService from '../services/persons'

const PeopleList = (props) => {
    const persons = props.persons
    const showAll = props.showAll

    const removePerson = (name, id) => {
        if (confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    personService
                        .getAll()
                        .then(response => {
                            props.setPersons(response.data)
                        })
                    props.setIsPositive(true)
                    props.setMessage(`${name} has been deleted from the phonebook.`)
                    setTimeout(() => {
                        props.setMessage(null)
                    }, 5000)
                })
                .catch(() => {
                    props.setIsPositive(false)
                    props.setMessage(`Information of ${name} has already been deleted from the phonebook.`)
                    setTimeout(() => {
                        props.setMessage(null)
                    }, 5000)
                })
        }
    }

    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.show === true)
    return (
        <ul>
            {personsToShow.map(person =>
                <li className='person' key={person.id}>{person.name} {person.number}<button onClick={() => removePerson(person.name, person.id)}>delete</button></li>)}
        </ul>
    )
}

export default PeopleList