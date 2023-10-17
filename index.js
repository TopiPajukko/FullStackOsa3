const express = require('express')
const app = express()

let persons = 
    {
        "persons": [
          {
            "name": "Ada Lovelace",
            "number": "123",
            "id": 1
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 2
          },
          {
            "name": "Ada Lovelacerz",
            "number": "12345",
            "id": 3
          },
          {
            "name": "Dan Abramovich",
            "number": "12-43-23434125",
            "id": 4
          }
        ]
      }

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const personById = persons.persons.find(elem => elem.id === Number(req.params.id))
    if(personById) {
    res.json(personById)
    } else {
    res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
	const personById = persons.persons.find(elem => elem.id === Number(req.params.id))
    if(personById) {
    persons.persons = persons.persons.filter(elem => elem.id !== Number(req.params.id))
    res.status(204).end()
    } else {
    res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const date = new Date()
    const numberOfPersons = persons.persons.length
	    res.send(
			`<p>Phonebook has info for ${numberOfPersons} persons</p>
             <br>
             <p>${date}</p>`
			)
		.catch(error => next(error))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})