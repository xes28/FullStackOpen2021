import Person from "./Person";

const Content = ({ persons, filter }) => (
    <div>
        <ul>
            {persons
                .filter(person =>
                    person.name.includes(filter) || filter === '')
                .map(person =>
                    <Person key={person.name} {...person} />
                )}
        </ul>
    </div>
)

export default Content