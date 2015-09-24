var express = require('express');
var router = express.Router();
var geocoder = require('node-geocoder').getGeocoder('google', 'http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Glance | Find your favorite Spot at a glance!' });
});

/* GET Spotlist page. */
router.get('/spotlist', function(req, res) {
    var db = req.db;
    var collection = db.get('spotcollection');

    // TODO: use the actual location of the user
    var currLoc = '38 Prism Irvine CA';
    geocoder.geocode(currLoc, function(err, result) {
        getNearbySpots(collection, result, res);
    });
});

/* GET Spotlist page. */
router.get('/city/:city', function(req, res) {
    var db = req.db;
    var collection = db.get('spotcollection');
    var city = req.params.city;

    geocoder.geocode(city, function(err, cityLoc) {
        getNearbySpots(collection, cityLoc, res);
    });
});

function getNearbySpots(collection, cityLoc, res) {
    collection.col.aggregate(
        [
            {$geoNear: {near: {type: "Point", coordinates: [cityLoc[0].longitude, cityLoc[0].latitude]}, distanceField: "dist.calculated", num: 10, spherical: true}}
        ],
        {}, function(e, docs){
        res.render('spot_list', {
            "spot_list" : docs,
            title : 'Glance | Find your favorite Spot at a glance!'
        });
    });
}

/* GET Spot detail page. */
router.get('/spots/:spot', function(req, res) {
    var db = req.db;
    var collection = db.get('spotcollection');
    var spot = req.params.spot;
    collection.findOne({index: spot},{},function(err,docs){
	if (err) {
            console.log('Could not find spot ' + spot + ' in DB');
        } else { 
            console.log('found ' + docs.index + ' in DB');
        }

        res.render('spot_detail_page', {
            "spot_details" : docs,
            title : spot
        });
    });
});

module.exports = router;
