var mongoose = require('mongoose')
var schema = mongoose.Schema;
var libschema = new schema(
    {
    title:String,
    genre:String,
    author:String,
    image:String
    }
)
var booksmodel = mongoose.model("Books",libschema,"Books");
module.exports = booksmodel;