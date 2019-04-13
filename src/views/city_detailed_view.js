const PubSub = require('../helpers/pub_sub.js');

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

  detailCityName = document.createElement('h3');
  detailCityName.textContent = `${this.allCityData.location.city}`;


  console.log(this.allCityData);

  detailNumberOfStations = document.createElement('p');
  detailNumberOfStations.textContent = `${this.allCityData.name} has ${this.allCityData.stations.length} bike stations in this area.`

  detailServiceProviders = document.createElement('p');


  detailContainer.appendChild(detailCityName);
  detailContainer.appendChild(detailNumberOfStations);
  container.appendChild(detailContainer);
};

module.exports = CityDetailedView;
