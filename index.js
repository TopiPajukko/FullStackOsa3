const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Personnel = require ('./models/personnel')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body', (req) => JSON.stringify(req.body))

let persons = 
    {
        /* "persons": [
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
        ] */
      }

app.get('/', (req, res) => {
  res.send()
})

app.get('/api/persons', (req, res, next) => {
  Personnel.find({})
  .then(result => {
    console.log(result)
    res.json(result)
  }) .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {

	Personnel
		.findById(req.params.id)
		.then(person => {
			if(person){
				res.json(person)
			}else{
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Personnel.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.post('/api/persons', postMorgan, (req, res, next) => {
    const body = req.body

    if(!body.name || !body.number) {
        return res.status(400).json({
		error: 'name or number missing'
		})
    }else{
    const person = new Personnel({
    name: body.name,
    number: body.number,
    })
    person.save()
    .then(person => {res.json(person)
    }).catch(error => next(error))
  }
})  

app.get('/info', (req, res, next) => {
    const date = new Date()
    Personnel.find({})
    .then(result => {
	    res.send(
        `<p>Phonebook has info for ${result.length} persons</p>
               <br>
               <p>${date}</p>`
			)
      }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const { name, number } = req.body

	Personnel.findByIdAndUpdate(
		req.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPerson => {
			res.json(updatedPerson)
		})
		.catch(error => next(error))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})