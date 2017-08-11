// first goal: display a list with location names using Knockout.js (add the map later)

let map;

let initialLocations = [
    {
        "position": {lat: 58.970936, lng: 5.732062},
        "name": 'Døgnvill'
    },
    {
        "position": {lat: 58.970818, lng: 5.735233},
        "name": 'Steam Kaffebar'
    },
    {
        "position": {lat: 58.970135, lng: 5.736521},
        "name": 'Thai Nong Khai As'
    },
    {
        "position": {lat: 58.971349, lng: 5.738650},
        "name": 'Mogul India'
    },
    {
        "position": {lat: 58.972237, lng: 5.732062},
        "name": 'Delhi Bar & Restaurant'
    },
    {
        "position": {lat: 58.973484, lng: 5.734870},
        "name": 'Norwegian Petroleum Museum'
    }
];

let Location = function (data) {

    this.position = ko.observable({
        "lat": data.position.lat,
        "lng": data.position.lng
    });
    this.name = ko.observable(data.name);
};

let ViewModel = function () {

    let self = this;

    this.locationList = ko.observableArray([]);

    initialLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    this.currentLocation = ko.observable(this.locationList()[0]);

    this.setLocation = function(clickedLocation) {
        self.currentLocation(clickedLocation);
        self.addMarker(clickedLocation);
    };

};

ko.applyBindings(new ViewModel());

ViewModel.prototype.addMarker = function(location) {

    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.position()),
        map: map,
        title: "test"
    });
};

//should i put this in modelview?
function initMap() {

    let stavanger = {lat: 58.9700, lng: 5.7331};
    map = new google.maps.Map(document.getElementById('map'), {
        center: stavanger,
        zoom: 15
    });
}

