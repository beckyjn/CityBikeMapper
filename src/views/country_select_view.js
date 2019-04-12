const PubSub = require('../helpers/pub_sub.js');

const CountrySelectView = function(container){
  this.allNetworkData = null
  this.allCountryData = "banana"
  this.container = container
};

CountrySelectView.prototype.bindEvents = function () {
  PubSub.subscribe('HireSchemes:all-country-data-ready', (evt) => {
    this.allCountryData = evt.detail;
    this.populateCountryList();
  });

  PubSub.subscribe('HireSchemes:all-bike-network-data-ready', (evt) => {
    const networkObjects = evt.detail;
    this.allNetworkData = networkObjects.networks;
  });
};

CountrySelectView.prototype.populateCountryList = function () {
  const countryCodes = this.getCountryCodes();
  const countryNames = [];
  const countryName = countryCodes.forEach((countryCode) => {
    const countryName = this.nameConverter(countryCode);
    countryNames.push(countryName);
  });
  console.log(countryNames);
};

CountrySelectView.prototype.getCountryCodes = function(){
  const everyCountryCode = [];
  let countryCodes = this.allNetworkData.forEach((network) => {
    everyCountryCode.push(network["location"]["country"]);
  });
  countryCodes = everyCountryCode.filter((countryCode, index, array) => {
      return array.indexOf(countryCode) === index;
    });
    return countryCodes
  };

CountrySelectView.prototype.nameConverter = function(countryCode){
  let countryName = "";
  const countryNameThing = this.allCountryData.forEach((country) => {
    if (country.alpha2Code === countryCode){
      return countryName = country.name;
    };
  });
  return countryName;
};

module.exports = CountrySelectView;
