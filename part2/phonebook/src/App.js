import React, { useEffect, useState } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Headers'
import personsService from './services/PersonService'
import PersonService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSusccessMessage] = useState('');

  useEffect(() => {
    personsService.getAll()
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
      let personToUpdate = repeated[0];
      personToUpdate.number = newNumber;
      console.log(personToUpdate);
      if (window.confirm(`${personToUpdate.name} is already added to phonebook. Do you want to replace the old number with the new one?`)) {
        PersonService.update(personToUpdate.id, personToUpdate)
          .then((response) => {
            const { data } = response;
            setSusccessMessage(`Updated ${data.name}`)
            setTimeout(() => {
              setSusccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`${personToUpdate.name} was already removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      blankInputs();
    } else {
      const addNewPerson = {
        name: newName,
        number: newNumber
      };

      personsService.create(addNewPerson)
        .then((response) => {
          const { data } = response;
          setPersons(persons.concat(data));
          setSusccessMessage(`Added ${data.name}`)
          blankInputs();
          setTimeout(() => {
            setSusccessMessage(null)
          }, 2000)
        })
        .catch(error => {
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log(error.response.data)
        })
    }
  }


  const handleOnChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  function blankInputs() {
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const personToDelete = persons.filter((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete[0].name}?`)) {
      personsService.delete(personToDelete)
        .then((response) => {
          setPersons(persons.filter(person => person.id !== personToDelete[0].id));
          setSusccessMessage(`Deleted ${personToDelete[0].name}`)
          setTimeout(() => {
            setSusccessMessage(null)
          }, 2000)
        })
        .catch(error => {
          setErrorMessage(`${personToDelete[0].name} was already removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <Header text="Phonebook" errorMsg={errorMessage} successMsg={successMessage} />
      <Filter value={filter} onChange={handleOnChangeFilter} />
      <Header text="Add a New" />
      <PersonForm onSubmit={handleSubmit} onChangeName={handleChangeName} valueName={newName} onChangeNumber={handleChangeNumber} valueNumber={newNumber} />
      <Header text="Numbers" />
      <Content persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App