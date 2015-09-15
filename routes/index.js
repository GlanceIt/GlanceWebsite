var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Glance' });
});

/* GET Spotlist page. */
router.get('/spotlist', function(req, res) {
    var db = req.db;
    var collection = db.get('spotcollection');
    collection.find({},{},function(e,docs){
        res.render('spot_list', {
            "spot_list" : docs
        });
    });
});

/* GET Spot detail page. */
router.get('/spots/:spot', function(req, res) {
    var db = req.db;
    var collection = db.get('spotcollection');
    var spot = req.params.spot;
    collection.findOne({name: spot},{},function(e,docs){
	if (e) { 
            console.log('Could not find spot ' + spot + ' in DB');
        } else { 
            console.log('found ' + docs.name + ' in DB');
        }

        res.render('spot_detail_page', {
            "spot_details" : docs
        });
    });
});

module.exports = router;
