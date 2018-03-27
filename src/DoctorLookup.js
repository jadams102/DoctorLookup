import $ from 'jquery';
let apiKey = process.env.exports.apiKey;
let mapsApiKey = process.env.exports.mapsApiKey;

export function SearchDoctors(displayDoctors, errorDisplay) {

$.ajax({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ addressString + "&key=" + mapsApiKey,
  type: 'GET',
  data: {
    format: 'json'
  },
  success: function(latlon) {
    let lat = latlon.results[0].geometry.location.lat;
    let lon = latlon.results[0].geometry.location.lng;
    let location = "location=" + lat.toFixed(3) + ',' + lon.toFixed(3) + "," + "30";

    $.ajax({
      url: "https://api.betterdoctor.com/2016-03-01/doctors?" + searchType + "=" + searchTerm + "&" + location + "&skip=0&limit=10&user_key=" + apiKey,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        displayDoctors(response)
      },
      error: function(xhr) {
        errorDisplay(xhr)

      }
    });
},
  error: function(xhr) {
    errorDisplay(xhr)
  }
});



}
