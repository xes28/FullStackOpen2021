const Filter = ({ value, onChange, errMsg }) => {
    return (
        <div>
            {errMsg ?
                <h1 className='error'>{errMsg}</h1>
                : ""}
            <label>Find countries: </label>
            <input value={value} onChange={onChange} placeholder="Search..." />
            <br></br>
        </div>
    )
}

export default Filter;