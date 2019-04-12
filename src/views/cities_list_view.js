const PubSub = require('../helpers/pub_sub.js');

const CityListView = function(container){
  this.container = container;
  this.allNetworkData = null;
  this.selectedCountry = null;
};

CityListView.prototype.bindEvents = function () {
  PubSub.subscribe('HireSchemes:all-bike-network-data-ready', (evt) => {
    const networkObjects = evt.detail;
    this.allNetworkData = networkObjects.networks;
    // console.log(this.allNetworkData);
  });
  PubSub.subscribe('HireSchemes:selected-hire-schemes-ready', (evt) => {
    console.log(evt.detail);
  });
};


module.exports = CityListView;
