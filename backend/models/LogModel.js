const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    requestBody: {
        type: String,
        require: true
    },
    responseBody:{
        type: String,
    },
    responseStatusCode:{
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Log', logSchema);