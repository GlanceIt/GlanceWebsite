var results;
var mapCanvas;
var map;
var mapCenter;
var marker;
var infoWindow;

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
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	};

	map = new google.maps.Map(mapCanvas, mapOptions);

	// marker = new google.maps.Marker({
	// 	position: mapCenter,
	// 	map: map,
	// 	draggable: true,
	// 	animation: google.maps.Animation.DROP
	// });

	setMarkers();

	//***This grabs user location
	results = document.getElementById("results");
	if (navigator.geolocation) {
		//navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure);
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
		infoWindow = new google.maps.InfoWindow({
			content: "Preparing..."
		});

		var spotName = spots.item(i).dataset.name;
		var spotUrl = spots.item(i).dataset.url;
		var spotImage = spots.item(i).dataset.img;
		var overallRating = spots.item(i).dataset.overall;
		var wifiRating = spots.item(i).dataset.wifi;
		var seatingRating = spots.item(i).dataset.seating;
		var parkingRating = spots.item(i).dataset.parking;
		
		var contentString = '<div id="content">' +
			'<div id="spot-image" class="spacing-1" style="height: 100px; width: 200px; position: relative;">' +
			'<div id="spot-image-hero" class="spot-hero" style="background-image: url(' + spotImage + '); background-size: cover; background-position: center;">' +
			'</div>' +
			'</div>' +
			
			'<div class="text-center spacing-1 spacing-top-0">' + 
			'<h4 class="spacing-0 spacing-top-0">' + spotName + '</h4>' +
			'<small>' +
			'<div class="star-rating spacing-1">' +
			drawStars(overallRating) +
			'</div>' +
			'</small>' +
			'<hr class="spacing-top-0 spacing-2">' + 
			'</div>' +

			'<div id="aspects">' +

			'<div id="aspect-wifi>' +
			'<div class="spacing-0"><strong>Wifi</strong></div>' +
			'<div class="star-rating spacing-1 text-2x">' +
			drawStars(wifiRating) +
			'</div>' +
			'</div>' +

			'<div id="aspect-wifi>' +
			'<div class="spacing-0"><strong>Seating</strong></div>' +
			'<div class="star-rating spacing-1 text-2x">' +
			drawStars(seatingRating) +
			'</div>' +
			'</div>' +

			'<div id="aspect-wifi>' +
			'<div class="spacing-0"><strong>Parking</strong></div>' +
			'<div class="star-rating spacing-1 text-2x">' +
			drawStars(parkingRating) +
			'</div>' +
			'</div>' +

			'</div>' +

			'</div>'
			;

		var spotMarker = new google.maps.Marker({
			// position: new google.maps.LatLng(spots.item(i).dataset.lat, spots.item(i).dataset.lng),
			position: {lat: parseFloat(spots.item(i).dataset.lat), lng: parseFloat(spots.item(i).dataset.lng)},
			map: map,
			icon: '../img/icons/spot-location.png',
			title: spotName,
			draggable: false,
			animation: google.maps.Animation.DROP,
			url: spotUrl,
			html: contentString
		});
		spotMarker.addListener('click', function() {
			//window.open(this.url, "_self");
			infoWindow.setContent(this.html);
			console.log(this.html);
			infoWindow.open(map, this);
		});
	}
}

function drawStars(overallRating) {
	var wholeStars = Math.floor(overallRating);
	var remainder = overallRating % 1;
	var hasHalfStar = false;
	var starHTML = "";

	if (remainder > 0 && remainder < 0.3) {
		hasHalfStar = false;
	}
	else if (remainder >= 0.3 && remainder <= 0.7) {
		hasHalfStar = true;
	}
	else if (remainder > 0.7) {
		hasHalfStar = false;
		wholeStars++;
	}

	for (var counter = 0; counter < 5; counter++) {
		if (counter < wholeStars) {
			starHTML += '<i class="icon fa fa-star icon-glance"></i>';
		}
		else if (hasHalfStar) {
			starHTML += '<i class="icon fa fa-star-half-o icon-glance"></i>';
			hasHalfStar = false;
		}
		else {
			starHTML += '<i class="icon fa fa-star-o icon-glance" style="opacity: 0.5;"></i>';
		}
	}

	return starHTML;
}