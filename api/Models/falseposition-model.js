const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rq_Schema = new Schema({
    pb : {
        type : String ,
        required : true
    },
    xL : {
        type : String ,
        required :true
    },
    xR : {
        type : String ,
        required :true
    },
})

module.exports = mongoose.model('falseposition',rq_Schema)