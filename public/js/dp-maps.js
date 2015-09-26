var results;
var mapCanvas;
var map;
var mapCenter;
var marker;
var locationData;

function initialize() {
	mapCanvas = document.getElementById("map-canvas");
	locationData = document.getElementById("spot-data");
	mapCenter = new google.maps.LatLng(locationData.dataset.lat, locationData.dataset.lng);

	var mapOptions = {
		scrollwheel: false,
		center: mapCenter,
	    streetViewControl: false,
	    zoom: 14,
	    backgroundColor: "#f5a623",
	    disableDefaultUI: true,
	    draggable: false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(mapCanvas, mapOptions);

	marker = new google.maps.Marker({
		position: mapCenter,
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP
	});

	//***This grabs user location
	// results = document.getElementById("results");
	// if (navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure);
	// 	results.innerHTML = "The Search has begun";
	// }
	// else {
	// 	results.innerHTML = "This browser does not support geolocation";
	// }
}

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, 'resize', function() {
	map.setCenter(mapCenter);
});

function geolocationSuccess(position) {
	mapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	map.setCenter(mapCenter);

	marker.setPosition(mapCenter);

	// Debug
	results.innerHTML = "Now you are on the map";
}

function geolocationFailure(error) {
	if (error.code == 1) {
		results.innerHTML = "You decided not to share, but that's OK. We won't ask again.";
	}
	else if (error.code == 2) {
		results.innerHTML = "The network is down or the positioning service can't be reached.";
	}
	else if (error.code == 3) {
		results.innerHTML = "The attempt timed out before it could get the location data.";
	}
	else {
		results.innerHTML = "This the mystery error. Something else happened, but we don't know what.";
	}
}