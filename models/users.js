const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        maxlength:60,
        minlength:2,
        required:true,
        unique:true
    },
    password: {
        type: String,
        maxlength:60,
        minlength:5
    }
})

module.exports = mongoose.model('user',userSchema);