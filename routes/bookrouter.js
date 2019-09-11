var express = require('express')
const router = express.Router();
const path = require('path');
var multer = require('multer');
var bodyparser = require('body-parser')
var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  var upload = multer({ storage : storage}).single('image');
var mongoose = require('mongoose')
var url = "mongodb+srv://reuben:1234@cluster0-fcmwh.mongodb.net/Library?retryWrites=true"
var books = require("../model/Book"); 
router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json());

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
    books.find({},function(err,result){
        
      /*   res.render("books",{pTitle:"Books",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/book/updatebook", title:"Update Books"},{link:"/book/addbook",title:"Add New Book"},{link:"/",title:"Log Out"}],books:result}); */
      res.send(result)
    })
})
router.get("/sp/:title",function(req,res){
   
    books.find({title:req.params.title},function(err,result){
       
        res.send(result)
      
     })
        
 })


 router.post("/addbook",upload, function(req,res){
    if(req.body.title!=undefined){
     var b = new books(req.body);
   /*   b.title = req.body.title;
     b.author = req.body.author;
     b.genre = req.body.genre;
     b.image = req.file.filename; */
     b.save(function(err){
        if (err) throw err;
        else{
            console.log("Added");
            
        }
    })
    }
    })
   
router.get("/view/:img",function(req,res){    
    res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})

    
/* router.get("/updatebook/:id",function(req,res){
        books.find({title:req.params.id},function(err,result){
            if (err) throw err;
            res.send(result);
        })
})
     */
router.post("/editbook", upload, function(req,res){
        books.updateOne({title:req.body.title} ,{$set:{
            title:req.body.title,
            author : req.body.author,
            genre : req.body.genre,
            image : req.body.image
        }}, function(err,result){
            if (err) throw err;
            else{
                books.find({},(err,result)=>{
                    if (err) throw err;
                    else
                        res.send(result)
                })
            }
        }) 
    })
    
    router.get("/deletebook/:bid",function(req,res){
        books.deleteOne({title:req.params.bid},function(err,result){
            if (err) throw err;
            else
            {
                books.find({},(err,result)=>{
                    if(err) throw err;
                    else
                        res.send(result)
                })
            }
        })
    })


