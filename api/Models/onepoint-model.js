const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rq_Schema = new Schema({
    pb : {
        type : String ,
        required : true
    },
    x : {
        type : String ,
        required :true
    }
})

module.exports = mongoose.model('onepoint',rq_Schema)