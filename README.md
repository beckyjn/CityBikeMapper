# CityBikeMappr

[View on Heroku!](https://citybikemappr.herokuapp.com/)

[View on Heroku](https://citybikemappr.herokuapp.com/)

Project created as weekend homework for CodeClan, using JS to pull data from an API and display the data.

This application provides the user with a dropdown list of countries that have city bike hire schemes which appear in the api.
The user selects a country, and is presented with a list of cities in that country which have bike hire schemes, and the name of the service provider.
Clicking on the city name produces a map showing the location of each bike hire station in that city.
Clicking a station shows details of bikes and free slots available at that location.

Later edits to styling and to get app ready to run on heroku.

## APIs used
* [City Bikes API](http://api.citybik.es/)
* [REST countries](https://restcountries.eu/)

## Libraries used
* [Leaflet](https://leafletjs.com/)

### Brief

Your task is to create an application that makes a request to an API and displays the data.

#### MVP

- The application should display data from an API request.
- The application should have a clear separation of concerns using a model and views.

#### Extensions

- Take input from the user to update the page. You could update the page by filtering or manipulating the data on user interaction, or you might make further API requests to load more data that is then displayed.

#### Advanced Extensions

Looking into a library to visual the data.

- [Leaflet](https://leafletjs.com/) is an open-source library for rendering maps
- [HighCharts](https://www.highcharts.com/) is an open-source library for rendering charts
