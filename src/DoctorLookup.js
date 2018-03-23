import $ from 'jquery';
const apiKey = process.env.exports.apiKey;


export function SearchDoctors() {
  let searchType = $('#search-type').val();
  let searchTerm = $('#search-term').val();
  $.ajax({
    url: "https://api.betterdoctor.com/2016-03-01/doctors?" + searchType + "=" + searchTerm + "&location=or-portland&skip=0&limit=10&user_key=" + apiKey,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        let title;
        if (response.data[i].profile.title === undefined) {
          title = "";
        } else {
          title = ", " + response.data[i].profile.title;
        }
        $("ul#result-list").append("<li>Name: " + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + title + "<hr></li>");
      }

      $('#number-of-results').text("Your Search Returned " + response.meta.count + " Results")

    },
    error: function() {
      $('#errors').text("There was an error. Please try again.")
    }
  });
}
