const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const password = process.argv[2]

const url = process.env.MONGODB_URI
//  `mongodb+srv://carlsjov:${password}@cluster0.moedpph.mongodb.net/phonebookApp?retryWrites=true&w=majority`

console.log('connectiong to', url)


mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)