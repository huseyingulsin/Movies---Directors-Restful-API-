const mongoose = require('mongoose')

module.exports = () => {

    mongoose.connect('==)');
    mongoose.connection.on('open',() => {
        console.log("mongodb connected")
    })
    mongoose.connection.on('error', () => {
        console.log("mongodb error")
    })
    mongoose.Promise = global.Promise
    
}

