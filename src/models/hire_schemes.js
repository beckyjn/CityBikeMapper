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
  const countriesUrl = `https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;demonym;nativeName`
  const countryRequestHelper = new RequestHelper(countriesUrl);
  countryRequestHelper.get()
    .then((countryData) => {
      this.allCountryData = countryData;
      // console.log(this.allCountryData);
      PubSub.publish('HireSchemes:all-country-data-ready', this.allCountryData)
    })
    .catch((error) => {`Unable to find name for ${countryCode}`});
};

module.exports = HireSchemes;
