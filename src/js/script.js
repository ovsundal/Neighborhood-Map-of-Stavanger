'use strict';

let map;
let service;

const initialLocations = [
    {
        "position": {lat: 58.970936, lng: 5.732062},
        "name": 'Døgnvill',
        "info": 'info for Døgnvill'
    },
    {
        "position": {lat: 58.970818, lng: 5.735233},
        "name": 'Steam Kaffebar',
        "info": 'info for Steam Kaffebar'
    },
    {
        "position": {lat: 58.970135, lng: 5.736521},
        "name": 'Thai Nong Khai As',
        "info": 'info for Thai Nong Khai As'
    },
    {
        "position": {lat: 58.971349, lng: 5.738650},
        "name": 'Mogul India',
        "info": 'info for Mogul India'
    },
    {
        "position": {lat: 58.972237, lng: 5.732062},
        "name": 'Delhi Bar & Restaurant',
        "info": 'info for Delhi Bar & Restaurant'
    }
];

class Location {
    constructor(data) {

        this.position = {
            "lat": data.position.lat,
            "lng": data.position.lng
        };
        this.name = data.name;
        this.info = data.info;
    }
}

//QUESTION: Will knockouts observables be messed up if i apply ES6 class to it?
let ViewModel = function () {

    let self = this;

    self.menuVisible = ko.observable(true);
    self.searchBarText = ko.observable("");

    self.toggleMenu = () => {
        this.menuVisible(!this.menuVisible());
    };

    self.locationList = ko.observableArray([]);

    //add initial locations to an observable (data-bindable) array
    initialLocations.forEach( (locationItem) => {
        self.locationList.push(new Location(locationItem));
    });

    self.currentLocation = ko.observable(self.locationList()[0]);

    self.setLocation = (clickedLocation) => {

        for(let i = 0; i < self.locationList().length; i++) {

            //search for location clicked in observable array
            if(clickedLocation === self.locationList()[i]) {

                //set the found location as new current location
                self.currentLocation = ko.observable(self.locationList()[i]);
                self.setInfoWindow();
            }
        }
    };

    self.setInfoWindow = () => {

        //if infoWindow does not exist, create it.
        if(!self.infoWindow) {
            self.infoWindow = new google.maps.InfoWindow();
        }

        // Change content and marker with new currentLocation
        self.infoWindow.setContent(self.currentLocation().name);
        self.infoWindow.open(map, self.currentLocation().marker);
    };

    self.createMarker = (location) => {
        debugger;
            location.marker = new google.maps.Marker({
                position: location.position,
                title: location.name,
                map: map,
                animation: google.maps.Animation.DROP
            });
            // QUESTION: listener below returns ..."read property 'apply' of undefined"...What is wrong?
            // locationItem.marker.addListener('click', self.setInfoWindow());
    };
};

let viewModel = new ViewModel();

ko.applyBindings(viewModel);

//callback function for google map async load
window.mapCallback = () => {
    initMap();
    //QUESTION: Is this the right way to interact with viewmodel?

    //create marker for each location
    viewModel.locationList().forEach((item) => {

        viewModel.createMarker(item);
    });


    service = new google.maps.places.PlacesService(map);

    // test data for nearBySearch
    var pyrmont = {lat: -33.867, lng: 151.195};

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['store']
    }, callback);

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

        results.forEach((item) => {

            viewModel.locationList.push(item);
            viewModel.createMarker(item);

        });


            // viewModel.createMarker(results);
        }
    }
};

function initMap() {

    const stavanger = {lat: 58.9700, lng: 5.7331};
    map = new google.maps.Map(document.getElementById('map'), {
        center: stavanger,
        zoom: 15,
        disableDefaultUI: true
    });
}


















