const RequestHelper = require('./request_helper.js')

const CountryNameConverter = function (countryCode){
  this.countryCode = countryCode,
  this.countryName = ""
};

CountryNameConverter.prototype.convert = function(){
  const url = `https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;demonym;nativeName`
  const requestHelper = new RequestHelper(url);
  requestHelper.get()
    .then((countryInfo) => {
      this.countryName = countryInfo[0].name;
    })
    .catch((error) => {
      `unable to find name for ${this.countryCode}`
    });
    console.log(this);
    return this.countryName;
    };


module.exports = CountryNameConverter;
