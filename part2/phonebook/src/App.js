import React, { useEffect, useState } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Headers'
import personsService from './services/PersonService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSusccessMessage] = useState('');

  useEffect(() => {
    personsService().getAllPersons()
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
    const person = persons.filter((person) =>
      person.name === newName
    )

    const personToAdd = person[0]
    const updatedPerson = { ...personToAdd, number: newNumber }

    if (person.length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with the new one?`)) {
        personsService().updatePerson(updatedPerson.id, updatedPerson)
          .then((response) => {
            const { data } = response;
            setPersons(persons.map(personItem => personItem.id !== personToAdd.id ? personItem : data))
            setSusccessMessage(`Updated ${data.name}`)
            setTimeout(() => {
              setSusccessMessage(null)
            }, 5000)
          }).catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      blankInputs();
    } else {
      const personToAdd = {
        name: newName,
        number: newNumber
      }
      personsService().createPerson(personToAdd)
        .then((response) => {
          const { data } = response;
          setPersons(persons.concat(data));
          setSusccessMessage(`Added ${data.name}`)
          blankInputs();
          setTimeout(() => {
            setSusccessMessage(null)
          }, 2000)
        }).catch(error => {
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService().deletePerson(personToDelete)
        .then((response) => {
          setPersons(persons.filter(person => person.id !== personToDelete.id));
          setSusccessMessage(`Deleted ${personToDelete.name}`)
          setTimeout(() => {
            setSusccessMessage(null)
          }, 2000)
        }).catch(error => {
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