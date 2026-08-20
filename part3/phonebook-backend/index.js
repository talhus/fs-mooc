const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /\d{2}-\d{6,7}|\d{3}-\d{5,8}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
})

const Person = mongoose.model('Person', personSchema)

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((err) => {
      next(err)
    })
})
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      res.json(person)
    })
    .catch((err) => {
      next(err)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => {
      next(err)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((err) => {
      next(err)
    })
})

app.post('/api/persons', (req, res, next) => {
  let body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  Person.countDocuments({ name: body.name })
    .then((count) => {
      console.log('count is', count)

      if (count > 0) {
        return res.status(409).json({ error: 'name must be unique' })
      }

      const person = {
        name: body.name,
        number: body.number,
      }

      Person.create(person)
        .then((newPerson) => {
          res.status(201).json(newPerson)
        })
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((length) => {
      const date = new Date()
      res.send(`<p>Phonebook has info for ${length} people</p> <p>${date}`)
    })
    .catch((err) => {
      next(err)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
