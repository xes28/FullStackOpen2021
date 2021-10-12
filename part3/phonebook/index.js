const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

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
    }
];

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>');
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.post('/api/persons', (request, response) => {
    const personRequest = request.body;
    if (!personRequest || !personRequest.name || !personRequest.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const duplicated = persons.find(person => person.name === personRequest.name);
    if (duplicated) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const ids = persons.map(person => person.id);
    const maxId = Math.max(...ids);

    const newPerson = {
        name: personRequest.name,
        number: personRequest.number,
        id: maxId + 1
    }

    persons = [...persons, newPerson];
    response.status(201).json(newPerson);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${currentDate} (${timeZone})</p>
        </div>
    `)
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})