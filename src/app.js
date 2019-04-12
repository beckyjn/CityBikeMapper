const HireScheme = require('./models/hire_schemes.js');
const CountrySelectView = require('./views/country_select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const countrySelectViewContainer = document.querySelector('.country-dropdown');
  const countrySelectView = new CountrySelectView(countrySelectViewContainer);
  countrySelectView.bindEvents();

  const hireScheme = new HireScheme();
  hireScheme.getData();

});
