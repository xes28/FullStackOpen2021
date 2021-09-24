import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
    return axios.get(baseUrl);
}

const createPerson = personToCreate => {
    return axios.post(baseUrl, personToCreate);
}

const deletePerson = (personToDelete) => {
    return axios.delete(`${baseUrl}/${personToDelete[0].id}`, personToDelete);
}

const updatePerson = (id, personToUpdate) => {
    return axios.put(`${baseUrl}/${id}`, personToUpdate)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: getAllPersons,
    delete: deletePerson,
    update: updatePerson,
    create: createPerson
};