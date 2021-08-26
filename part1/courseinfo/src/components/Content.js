import Part from "./Part";

const Content = (props) => {
    const parts = props.parts;
    return (
        <p>
            {parts.map(element => (
                <Part part={element.name} exercises={element.exercises} />
            ))}
        </p>
    )
}

export default Content