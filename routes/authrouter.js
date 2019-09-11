var express = require('express')
const router = express.Router();
const path = require('path');
var mongoose = require('mongoose')
var url = "mongodb+srv://reuben:1234@cluster0-fcmwh.mongodb.net/Library?retryWrites=true"
var authors = require("../model/Author"); 

// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

mongoose.connect(url, {useNewUrlParser:true},function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
module.exports = router;

router.get("/",function(req,res){
    authors.find({},function(err,result){
        
        res.send(result)
    })
})
router.get("/sa/:author",function(req,res){
   
    authors.find({author:req.params.author},function(err,result){
       

        res.send(result)
      })
        
 })

 router.get("/view/:img",function(req,res){    
    res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})

