var express = require('express');
var router = express.Router();
var client = require('node-rest-client').Client;
var serviceEndpoint = "http://ec2-52-89-65-158.us-west-2.compute.amazonaws.com:5000";

restClient = new client();

/* GET home page. */
router.get('/', function(req, res, next) {
    restClient.get(serviceEndpoint, function(data, response){
        var apiResJson = JSON.parse(data.toString('utf8'));
        var message = apiResJson.message;

        res.render('index', { 
            title : message, 
            pageTitle : 'Around You'
        });
    });
});

/* GET Spotlist page. */
router.get('/spotlist', function(req, res) {
    restClient.get(serviceEndpoint + "/spotlist", function(data, response){
        var apiResJson = JSON.parse(data.toString('utf8'));
        var spots = apiResJson.result;

        res.render('spot_list', {
            "spot_list" : spots,
            title : 'Glance | Find your favorite Spot at a glance!',
            pageTitle : 'Results'
        });
    });
});

/* GET City spots page. */
router.get('/city/:city', function(req, res) {
    var city = req.params.city;
    restClient.get(serviceEndpoint + "/city/" + city, function(data, response){
        var apiResJson = JSON.parse(data.toString('utf8'));
        var citySpots = apiResJson.result;

        res.render('spot_list', {
            "spot_list" : citySpots,
            title : 'Glance | Find your favorite Spot at a glance!',
            pageTitle : city
        });
    });
});

/* GET Spot detail page. */
router.get('/spots/:spot', function(req, res) {
    var spot = req.params.spot;
    restClient.get(serviceEndpoint + "/spots/" + spot, function(data, response){
        var apiResJson = JSON.parse(data.toString('utf8'));
        var spotDetails = apiResJson.result;

        res.render('spot_detail_page', {
            "spot_details" : spotDetails,
            title : spot
        });
    });
});

module.exports = router;
