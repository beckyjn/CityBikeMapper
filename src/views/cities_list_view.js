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

  const sortedCities = this.selectedCities.sort(function(a, b) {
    const textA = a.location.city.toUpperCase();
    const textB = b.location.city.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;});

  let cityName = "";
  let bikeHireLocalName = "";

  const eachCity = sortedCities.forEach((city) => {
    listContainer = document.createElement('ul');
    listContainer.classList.add('city-overview')
    this.container.appendChild(listContainer);

    listName = document.createElement('li');
    listName.innerHTML = `<a> City Name: ${city.location.city} </a>`;
    listContainer.appendChild(listName);

    listHireCompany = document.createElement('li');
    listHireCompany.textContent = `You can rent bikes here from ${city.name}`;
    listContainer.appendChild(listHireCompany);
  });
};



module.exports = CityListView;
