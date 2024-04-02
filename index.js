require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

/*let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]*/

//let persons = Person.find({}).then(p => JSON.stringify(p))
//console.log(persons)

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  }).catch(error => next(error))  
})

app.get('/info', (req, res) => {
    const date = new Date()
    const text = `<p>Phonebook has info for ${persons.length} people <br> ${date}</p>` 
    console.log(date)
    res.send(text)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  console.log(id)
  Person.findByIdAndDelete(id).then(deleted => {
    console.log("success", deleted)
    res.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log(body)
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  if ((person.name !== '' && person.name !== undefined) && (person.number !== '' && person.number !== undefined)) {
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
} else {
  res.status(400).send({ error: 'no required parameters'})
}
})


const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'no id signed'})
  }

  next(error)
}

app.use(errorHandler)

const unknownId = (error, req, res, next) => {
  console.error(error.message)
  res.status(404).send({ error: 'unknown request'})
}

app.use(unknownId)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)