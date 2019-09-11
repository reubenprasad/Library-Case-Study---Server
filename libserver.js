var express = require('express');

const app = express();
app.use(function (req, res, next) {

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
var authrouter = require("./routes/authrouter")
var bookrouter = require("./routes/bookrouter")
var userrouter = require("./routes/userrouter")
var bodyparser = require('body-parser')
/* var mongoose = require('mongoose')
var url = "mongodb://localhost/Library"
var users = require("./model/User"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
}); */
const path = require('path')
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname+"/public"))); 


app.use("/book",bookrouter);
app.use("/auth",authrouter);
app.use("/user", userrouter)
app.use(bodyparser.urlencoded({extended:true}))


app.use(bodyparser.json());

// Add headers
app.use(function (req, res, next) {

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


/* app.get("/",function(req,res){
   res.redirect('/user')
    });
 */
/* app.get("/index",function(req,res){
    res.render("index",{pTitle:"Library",nav:[{link:"/book",title:"Book"},{link:"/auth",title:"Author"},{link:"/",title:"Log Out"},{link:"/book/addbook",title:"Add New Book"}]});
    }); */

app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000')); 
   