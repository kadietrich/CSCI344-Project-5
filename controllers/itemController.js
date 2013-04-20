var Item = require("../models/item.js"),
    ItemController = {};
    
ItemController.list = function (req, res) {
    Item.find({}, function (err, items) {
        if (err !== null) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
};

ItemController.create = function (req, res) {
    var i = new Item ({
        "description":req.body.description,
        "categories":req.body.categories
    });
    
    i.save(function (err, result) {
        if (err !== null) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
};

ItemController.destroy = function (req, res) {
    Item.findOne({"description":req.body.description}, function (err, item) {
        if (err !== null) {
            console.log(err);
        } else if (item === null) {
            console.log("Item not found.")
        } else {
            item.remove(function (err) {
              if (err !== null) {
                  console.log(err);
              }
            });
        }
    });
};

module.exports = ItemController;