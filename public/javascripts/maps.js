var results;
var mapCanvas;
var map;
var mapCenter;
var marker;

function initialize() {
	mapCanvas = document.getElementById("map-canvas");
	mapCenter = new google.maps.LatLng(33.6694, -117.8231);

	var mapOptions = {
		center: mapCenter,
	    streetViewControl: false,
	    zoom: 14,
	    backgroundColor: "#f5a623",
	    disableDefaultUI: true,
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
	results = document.getElementById("results");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure);
		results.innerHTML = "The Search has begun";
	}
	else {
		results.innerHTML = "This browser does not support geolocation";
	}
}

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, 'resize', function() {
	map.setCenter(mapCenter);
});

function getGeolocationSuccess(position) {
	mapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	map.setCenter(mapCenter);

	marker.setPosition(mapCenter);

	// var infowindow = new google.maps.InfoWindow();

	// infowindow.setContent("You are here, or somewhere thereabouts.");
	// infowindow.setPosition(location);
	// infowindow.open(map);

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