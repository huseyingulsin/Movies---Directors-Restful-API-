const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true,'the {PATH} field is required.'],
        maxlength:15,
        minlength:1

    },
    category: {
        type: String,
        maxlength:30,
        minlength:1
    },
    country: {
        type: String,
        maxlength:30,
        minlength:1
    },
    year: {
        type: String,
        maxlength:30,
        minlength:1
    },
    imdb_score: {
        type: Number,
        maxlength:10,
        minlength:0
    },
    date: {
        type:Date,
        default:Date.now    
    }
    
})

module.exports = mongoose.model('movieview',MovieSchema);