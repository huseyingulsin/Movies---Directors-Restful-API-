const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect('mongodb+srv://usernamee:123456Hh@cluster0.gfnqwte.mongodb.net/?retryWrites=true&w=majority');
    mongoose.connection.on('open',() => {
        console.log("mongodb connected")
    })
    mongoose.connection.on('error', () => {
        console.log("mongodb error")
    })
    mongoose.Promise = global.Promise
    
}