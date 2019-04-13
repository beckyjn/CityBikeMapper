const PubSub = require('../helpers/pub_sub.js');

const CountrySelectView = function(container){
  this.allNetworkData = null
  this.allCountryData = null
  this.container = container
  this.countryNames = null
  this.everyCountryName = null
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
};

CountrySelectView.prototype.populateCountryList = function(container){
  const countryNames = this.populateCountryNames();
  this.everyCountryName = countryNames.sort();
  let dropdown = container;

  dropdown.addEventListener('change', (event)=>{
    const selectedCountryName = event.target.value;
    PubSub.publish('SelectView:country-selected', selectedCountryName);
  });

  dropdown = countryNames.forEach((countryName)=>{
    dropdown.appendChild(this.createOption(countryName))
  });
};

CountrySelectView.prototype.populateCountryNames = function () {
  const countryCodes = this.getCountryCodes();

  const countryNames = [];
  this.countryNames = countryCodes.forEach((countryCode) => {
    countryName = this.nameConverter(countryCode);
    countryNames.push(countryName);
  });
  return countryNames;
};

CountrySelectView.prototype.getCountryCodes = function(){
  const everyCountryCode = [];
  let countryCodes = this.allNetworkData.forEach((network) => {
    // fixes error with countrycode for Edinburgh
    if (network["location"]["country"] === "UK"){
      network["location"]["country"] = "GB";
    }
    everyCountryCode.push(network["location"]["country"]);
  });

  // makes list of unique country codes
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

CountrySelectView.prototype.createOption = function(countryName, index){
  const option = document.createElement('option')
  option.textContent = countryName;
  option.id = this.everyCountryName.indexOf(countryName);
  return option;
};

module.exports = CountrySelectView;
