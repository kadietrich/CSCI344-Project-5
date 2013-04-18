// We need to 'require' the following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
    mongoose = require("mongoose"),
    app = express();
    
mongoose.connect("mongodb://localhost/development");    
    
var ItemSchema = {
    "description":String,
    "categories":[String]
}

var Item = mongoose.model("Item", ItemSchema);
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

app.get("/items.json", function (req, res) {
    Item.find({}, function (err, items) {
        if (err !== null) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

app.post("/items/new", function (req, res) {
    var i = new Item({
        "description":req.body.description,
        "categories":req.body.categories
    });
    i.save(function (err, result) {
        if (err !== null){
            console.log(err);
        } else {
            res.json(result);
        }
    });
});