const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    name : {
        type :String,
        required : [true ,'must provide a name'],
        trim : true, // to remove whitespaces from the beginning 
        maxlength : [30,'name cannot be more than 20bytes']
    },
    completed : {
        type : Boolean,
        default : false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
})

module.exports = mongoose.model('Task',TaskSchema)