const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rq_Schema = new Schema({
    pb : {
        type : String ,
        required : true
    },
    x0 : {
        type : String ,
        required :true
    },
    x1 : {
        type : String ,
        required :true
    },
})

module.exports = mongoose.model('secant',rq_Schema)