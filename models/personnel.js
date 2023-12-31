const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODBURI
console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {    
        console.log('connected to MongoDB')  
    })  
    .catch((error) => {    
        console.log('error connecting to MongoDB:', error.message)  
    })

const personnelSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{7,}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        minLength: 8,
        required: true
    }
})

personnelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personnelSchema)