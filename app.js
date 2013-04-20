// We need to 'require' the following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
    app = express(),
    ic;
    
//Controller
ic = require("./controllers/itemController.js");

// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
});

// Create the http server and get it to listen on the specified port 3000                                                                                                                   
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
});

app.get("/items.json", ic.list);
app.post("/items/new", ic.create);