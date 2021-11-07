import axios from "axios";

const baseUrl = 'api/persons';

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
        const request = axios.put(`${baseUrl}/${id}`, personToUpdate)
        return request.then(response => response.data)
    }

    const query = (name) => {
        const request = axios.get(`${baseUrl}/query/${name}`)
        return request.then(response => response.data)
    }

    return {
        getAllPersons,
        deletePerson,
        updatePerson,
        createPerson,
        query
    };
}

export default personService;
