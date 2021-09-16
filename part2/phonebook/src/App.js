import React, { useEffect, useState } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Headers'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        const { data } = response;
        setPersons(data);
      })
  }, []);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const repeated = persons.filter((person) => person.name === newName)
    //Si existe es que el nombre introducido ya existe en la lista
    if (repeated[0]) {
      blankInputs();
      return alert(`${newName} is already added to phonebook`)
    }

    const addNewPerson = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(addNewPerson));
    blankInputs();
  }

  const handleOnChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  function blankInputs() {
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Filter value={filter} onChange={handleOnChangeFilter} />
      <Header text="Add a New" />
      <PersonForm onSubmit={handleSubmit} onChangeName={handleChangeName} valueName={newName} onChangeNumber={handleChangeNumber} valueNumber={newNumber} />
      <Header text="Numbers" />
      <Content persons={persons} filter={filter} />
    </div>
  )
}

export default App