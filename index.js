require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

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
  })  
})

app.get('/info', (req, res) => {
    const date = new Date()
    const text = `<p>Phonebook has info for ${persons.length} people <br> ${date}</p>` 
    console.log(date)
    res.send(text)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.deleteOne({_id: id}).then(deleted => {
    console.log("success", deleted)
  })
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (body.number === undefined || body.name === undefined) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  console.log(person)
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)