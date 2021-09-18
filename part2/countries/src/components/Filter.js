const Filter = ({ value, onChange }) => {
    return (
        <div>
            <label>Find countries: </label>
            <input value={value} onChange={onChange} placeholder="Search..." />
            <br></br>
        </div>
    )
}

export default Filter;