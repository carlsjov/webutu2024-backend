const express = require('express')
const app = express()

app.use(express.json())

let persons = [
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
  ]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    const text = `<p>Phonebook has info for ${persons.length} people <br> ${date}</p>` 
    console.log(date)
    res.send(text)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const randomId = Math.floor(Math.random()*1000)
  const person = req.body
  if (person.number && person.name) {
    person.id = randomId
    console.log(person)
    const checkName = persons.find(check => check.name === person.name)
    const checkNumber = persons.find(check => check.number === person.number)
    console.log(checkName, checkNumber)
    if (checkName || checkNumber) {
      return res.status(400).json({
        error: 'name or number already in use'
      })
    } else {
      persons = persons.concat(person)
      res.json(person)
    }
  } else {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)