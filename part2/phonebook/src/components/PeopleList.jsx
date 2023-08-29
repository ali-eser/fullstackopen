import personService from '../services/persons'

const PeopleList = (props) => {
    const persons = props.persons
    const showAll = props.showAll

    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.show === true)
    return (
        <ul>
            {personsToShow.map(person =>
                <li key={person.id}>{person.name} {person.number} <button onClick={() => personService.remove(person.id)}>delete</button></li>)}
        </ul>
    )
}

export default PeopleList