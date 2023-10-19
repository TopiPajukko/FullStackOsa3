const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://topipajukko:${password}@phonebookdatabase.tfaxfso.mongodb.net/PhonebookDatabase?retryWrites=true&w=majority`
  

mongoose.set('strictQuery',false)
mongoose.connect(url)
  
const personnelSchema = new mongoose.Schema({
    name: String,
    number: String
})
  
const Personnel = mongoose.model('person', personnelSchema)
  
  if(process.argv.length===3){
    
    Personnel.find({}).then(result => {
      console.log('phonebook: ')
      result.forEach(personnel => {
        console.log(`${personnel.name} ${personnel.number}`)
      })
      mongoose.connection.close()
    })
  
  }else{
    const personnel = new Personnel({
      name: process.argv[3],
      number: process.argv[4],
    }) 
    
    personnel.save().then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
  }