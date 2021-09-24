const Person = ({ person, deletePerson }) => (
    <li>
        <label> {person.name} - {person.number} </label>
        <button onClick={() => deletePerson(person.id)}>Delete</button>
    </li>
)

export default Person