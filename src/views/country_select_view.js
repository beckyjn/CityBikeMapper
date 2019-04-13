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
  this.everyCountryName = countryNames
  let dropdown = container;


  dropdown.addEventListener('change', (event)=>{
    const selectedCountryName = event.target.value;
    const selectedCountryCode = this.codeFinder(selectedCountryName);
    const selectedCountry = this.selectedCountryData(selectedCountryCode);
    PubSub.publish('SelectView:country-selected', selectedCountry);
  });

  dropdown = countryNames.forEach((countryName)=>{
    dropdown.appendChild(this.createOption(countryName))
  });

};

CountrySelectView.prototype.createOption = function(countryName, index){
  const option = document.createElement('option')
  option.textContent = countryName;
  option.id = this.everyCountryName.indexOf(countryName);
  return option;
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
  this.allCountryData.forEach((country) => {
    if (country.name === countryName){
     countryCode = country.alpha2Code;
    };
  });
  return countryCode;
};

CountrySelectView.prototype.selectedCountryData = function (selectedCountry) {
const networkData = [];
const networkCountry = this.allNetworkData.forEach((network) => {
    if(network.location.country === selectedCountry){
      networkData.push(network);
    };
  });
return networkData;
};

module.exports = CountrySelectView;
