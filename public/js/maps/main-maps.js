var results;
var mapCanvas;
var map;
var mapCenter;
var marker;

function initialize() {
	mapCanvas = document.getElementById("map-canvas");
	mapCenter = new google.maps.LatLng(33.6694, -117.8231);

	var mapOptions = {
		scrollwheel: false,
		center: mapCenter,
	    streetViewControl: false,
	    zoom: 12,
	    backgroundColor: "#f5a623",
	    disableDefaultUI: true,
	    zoomControl:true,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	};

	map = new google.maps.Map(mapCanvas, mapOptions);

	marker = new google.maps.Marker({
		position: mapCenter,
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP
	});

	//setMarkers();

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

function geolocationSuccess(position) {
	mapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	map.setCenter(mapCenter);

	marker.setPosition(mapCenter);

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

function setMarkers() {
	// var markerImage = {
	// 	url: '../img/icons/spot-location.png',
	// 	size: new google.maps.Size(40, 40),
	// 	origin: new google.maps.Point(0, 0),
	// 	anchor: new google.maps.Point(0, 40)
	// };

	// var spots = $(".spot-data");

	// spots.each(function(key, val) {
	// 	var locationName = $(this).data('name');
	// 	var spotUrl = $(this).data('url');
	// 	var spotMarker = new google.maps.Marker({
	// 		position: {lat: $(this).data('lat'), lng: $(this).data('lng')},
	// 		map: map,
	// 		// icon: markerImage,
	// 		icon: '../img/icons/spot-location.png',
	// 		title: locationName,
	// 		draggable: false,
	// 		animation: google.maps.Animation.DROP
	// 	});
	// 	spotMarker.addListener('click', function() {
	// 		window.open(spotUrl, "_self");
	// 	});
	// });

	var spots = document.getElementsByClassName('spot-data');

	for (var i = 0; i < spots.length; i++) {
		var locationName = spots.item(i).dataset.name;
		var spotUrl = spots.item(i).dataset.url;
		var spotMarker = new google.maps.Marker({
			// position: new google.maps.LatLng(spots.item(i).dataset.lat, spots.item(i).dataset.lng),
			position: {lat: parseFloat(spots.item(i).dataset.lat), lng: parseFloat(spots.item(i).dataset.lng)},
			map: map,
			icon: '../img/icons/spot-location.png',
			title: locationName,
			draggable: false,
			animation: google.maps.Animation.DROP
		});
		spotMarker.addListener('click', function() {
			window.open(spotUrl, "_self");
		});
	}
}