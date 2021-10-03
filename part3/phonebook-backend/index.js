const express = require('express');
const app = express();

app.use(express.json());


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Test",
    "number": "987654321",
    "id": 5
  }
]

//Raiz
app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

//Mostrar personas
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//Filtrar persona por id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

//Añadir persona
app.post('/api/persons', (request, response) => {
  const person = request.body
  const duplicated = persons.map(tmpPerson => tmpPerson.name === person.name);


  if (!person || !person.name || !person.number) {
    return response.status(404).json({
      error: 'body\'s missing'
    })
  } else if (duplicated) {
    return response.status(404).json({
      error: 'name must be unique'
    })
  }

  const ids = persons.map(person => person.id);
  const maxID = Math.max(...ids)

  const newPerson = {
    name: person.name,
    number: person.number,
    id: maxID + 1
  }

  persons = [...persons, newPerson]
  response.status(201).json(newPerson);
})

//Eliminar persona
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end();
})

//Información de la agenda
app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  response.send(
    `
      <div>
        <p>Phonebook has info for ${persons.length} people</p>
      </div>
      <div>
        <p>${currentDate} ${timeZone}</p>
      </div>
    `
  )
})

//URL no definida
app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

// Puerto de escucha
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})