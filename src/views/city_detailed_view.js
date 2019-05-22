const PubSub = require('../helpers/pub_sub.js');
const accessToken = require('../helpers/access_token.js')

const CityDetailedView = function(container){
  this.container = container;
  this.allCityData = null;
};

CityDetailedView.prototype.bindEvents = function () {
  PubSub.subscribe('HireSchemes:selected-city-info-ready', (evt) => {
    this.allCityData = evt.detail;
    this.allCityData = this.allCityData.network;
    this.displayInfo(this.container);
  });
};

CityDetailedView.prototype.displayInfo = function (container) {
  container.innerHTML = "";
  detailContainer = document.createElement('div');
  detailContainer.classList.add('city-info')

  detailCityName = document.createElement('h2');
  detailCityName.textContent = `${this.allCityData.location.city}`;

  detailNumberOfStations = document.createElement('p');
  detailNumberOfStations.textContent = `${this.allCityData.name} has ${this.allCityData.stations.length} bike stations in this area.`

  detailMap = document.createElement('div');
  detailMap.setAttribute("id", "mapid")


  detailContainer.appendChild(detailCityName);
  detailContainer.appendChild(detailNumberOfStations);
  detailContainer.appendChild(detailMap);
  container.appendChild(detailContainer);

  detailMap = this.populateMap();
};

CityDetailedView.prototype.populateMap = function () {
  const cityLat = this.allCityData.location.latitude;
  const cityLong = this.allCityData.location.longitude

  const mymap = L.map('mapid').setView([cityLat, cityLong], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: accessToken
}).addTo(mymap);

const allStations = this.allCityData.stations
  allStations.forEach((station) => {
    stationLat = station.latitude;
    stationLong = station.longitude;
    stationName = station.name;
    stationFreeBikes = station.free_bikes;
    stationEmptySlots = station.empty_slots;

    var myIcon = L.icon({
    iconUrl: '../../images/map-marker.png',

    iconSize:     [64, 64], // size of the icon
    iconAnchor:   [32, 63], // point of the icon which will correspond to marker's location
    popupAnchor:  [-1, -50] // point from which the popup should open relative to the iconAnchor
});


    var marker = L.marker([stationLat, stationLong], {icon: myIcon}).addTo(mymap);
    marker.bindPopup(`<b>${stationName}</b><br>${stationFreeBikes} bikes available.<br>${stationEmptySlots} empty slots.`).openPopup();
});
};


module.exports = CityDetailedView;
