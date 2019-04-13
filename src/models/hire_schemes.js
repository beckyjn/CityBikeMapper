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

// need country data to display country names, as citybikes api only provides an alpha code
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
  //handles data when a country has been selected - returns all city hire schemes in selected country
  PubSub.subscribe('SelectView:country-selected', (evt) => {
   const selectedCountryName = evt.detail;
   const selectedCountryCode = this.codeFinder(selectedCountryName);
   const countryData = this.selectedCountryData(selectedCountryCode);
   if (countryData !== []){
      PubSub.publish('HireSchemes:selected-hire-schemes-ready', countryData);
    };
  });

  //handles data when a city has been selected
  PubSub.subscribe('CitiesList:city-has-been-selected', evt => {
    cityDetailUrl = "";
    const selectedCityName = evt.detail[0];
    const selectedScheme = evt.detail[1];
    const selectedCityDetails = this.findHref(selectedCityName, selectedScheme)
    cityDetailUrl = `http://api.citybik.es${selectedCityDetails}`
    if (cityDetailUrl !== ""){
      const cityRequestHelper = new RequestHelper(cityDetailUrl);
      cityRequestHelper.get()
      .then((allCityData) => {
        PubSub.publish('HireSchemes:selected-city-info-ready', allCityData)
      });
    };
  });
};

//uses country name to find alpha2code, which the two datasets have in common
HireSchemes.prototype.codeFinder = function(countryName){
  let countryCode = "";
  allCountryData.forEach((country) => {
    if (country.name === countryName){
     countryCode = country.alpha2Code;
    };
  });
  return countryCode;
};

// uses alpha2 code to return matching citybike schemes from the citybike api
HireSchemes.prototype.selectedCountryData = function (selectedCountryCode) {
  const networkData = [];
  const networkCountry = this.allNetworkData.networks.forEach((network) => {
      if(network.location.country === selectedCountryCode){
        networkData.push(network);
      };
    });
  return networkData;
};

// searches api for matching city and returns link to the api for the cities detailed information
HireSchemes.prototype.findHref = function (cityName, scheme) {
  let cityHref = "";
  const banana = this.allNetworkData.networks.forEach((network) => {
    if(network.location.city === cityName && network.name === scheme){
      cityHref = network.href
      };
    });
  return cityHref

};

module.exports = HireSchemes;
