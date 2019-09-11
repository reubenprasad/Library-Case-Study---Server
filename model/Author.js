var mongoose = require('mongoose')
var schema = mongoose.Schema;
var libschema = new schema(
    {
    author:String,
    image:String,
    genre:String
    }
)
var authmodel = mongoose.model("Authors",libschema,"Authors");
module.exports = authmodel;