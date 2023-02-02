const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true        
    },
    completed: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

const taskModel = mongoose.model('Task', taskSchema)
module.exports = taskModel