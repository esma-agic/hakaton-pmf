const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    phone: {type: String, },
    contacts: [{
        type:  mongoose.Schema.Types.ObjectId, ref: "Student"
    }],

})


module.exports = mongoose.model('Student', studentSchema, 'student')