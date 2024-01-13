const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    subject: {
        type: String,
        require: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        require: true
    },
    grade: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Student',
    }],
    active: {
        type: Boolean,
        default: true
    },

    likes: {type: Number, default: 0},
    date: { type: Date, default: Date.now}
})


postSchema.methods.getFormatedDate= function(){
    return this.date.toLocaleDateString()
}



module.exports = mongoose.model('Post', postSchema)