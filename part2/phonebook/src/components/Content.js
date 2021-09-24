import Person from "./Person";

const Content = ({ persons, filter, deletePerson }) => {
    if (persons.length === 0) {
        return (
            <div>
                <h4>Error loading phonebook registers</h4>
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    {persons
                        .filter(person =>
                            person.name.includes(filter) || filter === '')
                        .map(person =>
                            <Person key={person.id} person={person} deletePerson={deletePerson} />
                        )}
                </ul>
            </div>
        )

    }
}

export default Content