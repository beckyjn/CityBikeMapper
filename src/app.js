const HireScheme = require('./models/hire_schemes.js');
const CountrySelectView = require('./views/country_select_view.js');
const CityListView = require('./views/cities_list_view.js');
const CityDetailedView = require('./views/city_detailed_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const countrySelectViewContainer = document.querySelector('#country-dropdown');
  const countrySelectView = new CountrySelectView(countrySelectViewContainer);
  countrySelectView.bindEvents();

  const citiesListViewContainer = document.querySelector('.cities-list');
  const citiesListView = new CityListView(citiesListViewContainer);
  citiesListView.bindEvents();

  const cityDetailedViewContainer = document.querySelector('.city-detail');
  const cityDetailView = new CityDetailedView(cityDetailedViewContainer)
  cityDetailView.bindEvents();

  const hireScheme = new HireScheme();
  hireScheme.getData();
  hireScheme.bindEvents();

});
