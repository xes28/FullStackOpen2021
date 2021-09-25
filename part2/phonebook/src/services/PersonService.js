import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

function personService() {

    const getAllPersons = () => {
        return axios.get(baseUrl);
    }

    const createPerson = personToCreate => {
        return axios.post(baseUrl, personToCreate);
    }

    const deletePerson = (personToDelete) => {
        return axios.delete(`${baseUrl}/${personToDelete.id}`, personToDelete);
    }

    const updatePerson = (id, personToUpdate) => {
        return axios.put(`${baseUrl}/${id}`, personToUpdate)
    }

    return {
        getAllPersons,
        deletePerson,
        updatePerson,
        createPerson
    };
}

export default personService;
