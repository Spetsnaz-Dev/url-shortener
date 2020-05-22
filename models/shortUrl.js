const mongoose = require('mongoose')
const shortId = require('shortid')

// Define Columns of Database
const shortUrlSchema = new mongoose.Schema({
    full : {
        type : String,
        required : true
    },
    short : {
        type : String,
        required : true,
        default : shortId.generate
        // default : () => shortId.generate
    },
    clicks : {
        type : Number,
        required : true,
        default : 0
    }
})

module.exports = mongoose.model('shortUrls', shortUrlSchema)