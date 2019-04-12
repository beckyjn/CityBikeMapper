const PubSub = require('../helpers/pub_sub.js');

const CountrySelectView = function(container){
  this.allNetworkData = null
  this.allCountryData = null
  this.container = container
  this.countryNames = null
};

CountrySelectView.prototype.bindEvents = function () {
  PubSub.subscribe('HireSchemes:all-country-data-ready', (evt) => {
    this.allCountryData = evt.detail;
    this.populateCountryList(this.container);
  });

  PubSub.subscribe('HireSchemes:all-bike-network-data-ready', (evt) => {
    const networkObjects = evt.detail;
    this.allNetworkData = networkObjects.networks;
  });

  PubSub.publish('CountrySelectView:country-selected', event.target.value)
};

CountrySelectView.prototype.populateCountryList = function(container){
  const countryNames = this.populateCountryNames();
  let dropdown = container

  dropdown.addEventListener('change', (event)=>{
    PubSub.publish('SelectView:country-selected', event.target.value);
  });
  dropdown = countryNames.forEach((countryName)=>{
        dropdown.appendChild(this.createOption(countryName))
  });
};

CountrySelectView.prototype.createOption = function(countryName){
  const option = document.createElement('option')
  option.textContent = countryName;
  option.id = countryName;
  return option;
};

CountrySelectView.prototype.populateCountryNames = function () {
  const countryCodes = this.getCountryCodes();
  const countryNames = [];
  this.countryNames = countryCodes.forEach((countryCode) => {
    countryName = this.nameConverter(countryCode);
    countryNames.push(countryName);
  });
  return countryNames
};

CountrySelectView.prototype.getCountryCodes = function(){
  const everyCountryCode = [];
  let countryCodes = this.allNetworkData.forEach((network) => {
    everyCountryCode.push(network["location"]["country"]);
  });
  countryCodes = everyCountryCode.filter((countryCode, index, array) => {
      return array.indexOf(countryCode) === index;
    });
    return countryCodes;
  };

CountrySelectView.prototype.nameConverter = function(countryCode){
  let countryName = "";
  const countryNameThing = this.allCountryData.forEach((country) => {
    if (country.alpha2Code === countryCode){
     countryName = country.name;
    };
  });
  return countryName;
};

CountrySelectView.prototype.codeFinder = function(countryName){
  let countryCode = "";
  const countryNameThing = this.allCountryData.forEach((country) => {
    if (country.name === countryName){
     countryCode = country.alpha2Code;
    };
  });
  return countryCode;
};

module.exports = CountrySelectView;
