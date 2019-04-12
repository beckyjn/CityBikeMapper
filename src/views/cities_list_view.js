const PubSub = require('../helpers/pub_sub.js');

const CityListView = function(container){
  this.container = container;
  this.selectedCities = null;
};

CityListView.prototype.bindEvents = function () {
  PubSub.subscribe('HireSchemes:selected-hire-schemes-ready', (evt) => {
    const selectedCountryData = evt.detail;
    this.selectedCities = selectedCountryData;
    this.publishCityInfo();
  });
};

CityListView.prototype.publishCityInfo = function () {
  this.container.innerHTML= "";

  let cityName = "";
  let bikeHireLocalName = "";

  const eachCity = this.selectedCities.forEach((city) => {
    listContainer = document.createElement('ul');
    this.container.appendChild(listContainer);

    listName = document.createElement('li');
    listName.textContent = `City Name: ${city.location.city}`;
    listContainer.appendChild(listName);

    listHireCompany = document.createElement('li');
    listHireCompany.textContent = `You can rent bikes here from ${city.name}`;
    listContainer.appendChild(listHireCompany);
  });
};



module.exports = CityListView;
