var mongoose = require("mongoose"),
    ItemSchema,
    Item;
    
mongoose.connect("mongodb://localhost/development");

ItemSchema = new mongoose.Schema({
    "description":String,
    "categories":[String]
});

Item = mongoose.model("Item", ItemSchema);

Item.findOne({}, function (err, result) {
    if (err !== null) {
        console.log(err);
    } else if (result === null) {
        var i = new Item({
            "description": "finish homework",
            "categories": ["school", "work"]
        });
        
        i.save(function (err) {
            if (err !== null) {
                console.log(err);
            }
        });
    }
});

module.exports = Item;