const PersonForm = ({ onSubmit, onChangeName, valueName, onChangeNumber, valueNumber }) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input onChange={onChangeName} value={valueName} />
        </div>
        <div>
            number: <input onChange={onChangeNumber} value={valueNumber} pattern="[0-9]*" />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm