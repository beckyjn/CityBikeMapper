const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const HireSchemes = function () {
  this.allNetworkData = null;
  this.allCountryData = null;
};

HireSchemes.prototype.getData = function () {
  const bikesUrl = `http://api.citybik.es/v2/networks`
  const bikeRequestHelper = new RequestHelper(bikesUrl);
  bikeRequestHelper.get()
    .then((stuff)=> {
      this.allNetworkData = stuff;
      PubSub.publish('HireSchemes:all-bike-network-data-ready', this.allNetworkData)
    })
    .then(this.getCountryData);
  };

HireSchemes.prototype.getCountryData = function () {
  const countriesUrl = `https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;demonym;nativeName;subregion;region`
  const countryRequestHelper = new RequestHelper(countriesUrl);
  countryRequestHelper.get()
    .then((countryData) => {
      this.allCountryData = countryData;
      PubSub.publish('HireSchemes:all-country-data-ready', this.allCountryData)
    })
    .catch((error) => {`Unable to find name for ${countryCode}`});
};

HireSchemes.prototype.bindEvents = function (){
  let countryData = [];
  PubSub.subscribe('SelectView:country-selected', (evt) => {
   const selectedCountryName = evt.detail;
   const selectedCountryCode = this.codeFinder(selectedCountryName);
   const countryData = this.selectedCountryData(selectedCountryCode);
   if (countryData !== []){
      console.log(countryData);
      PubSub.publish('HireSchemes:selected-hire-schemes-ready', countryData);
    };
  });
};

HireSchemes.prototype.codeFinder = function(countryName){
  let countryCode = "";
  allCountryData.forEach((country) => {
    if (country.name === countryName){
     countryCode = country.alpha2Code;
    };
  });
  return countryCode;
};

HireSchemes.prototype.selectedCountryData = function (selectedCountry) {
const networkData = [];
const networkCountry = this.allNetworkData.networks.forEach((network) => {
    if(network.location.country === selectedCountry){
      networkData.push(network);
    };
  });
return networkData;
};


module.exports = HireSchemes;
