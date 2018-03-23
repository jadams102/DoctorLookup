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
      if (response.data.length === 0) {
        $("ul#result-list").append("<li>Please try a different earch term</li>")
      }

      for (var i = 0; i < response.data.length; i++) {
        let title;
        if (response.data[i].profile.title === undefined) {
          title = "";
        } else {
          title = ", " + response.data[i].profile.title;
        }
        let imgUrlString = '<li><img src="' + response.data[i].profile.image_url + '">'
        let nameString = "<br>Name: " + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + title;
        let addressString = "<br>Address: " + response.data[i].practices[0].visit_address.street + ", " +  response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state;
        let phoneString = "<br>Phone: " + response.data[i].practices[0].phones[0].number
        let websiteString;
        if (response.data[i].practices[0].website === undefined) {
          websiteString = "";
        } else {
          websiteString = '<br>Website: <a href="' + response.data[i].practices[0].website + '">' + response.data[i].practices[0].website + "</a>";
        }

        let patientsString;
        if (response.data[i].practices[0].accepts_new_patients === false) {
          patientsString = "<br>Not Accepting New Patients";
        } else {
          patientsString = "<br>Accepting New Patients";
        }

        $("ul#result-list").append(imgUrlString + nameString + addressString + phoneString + websiteString + patientsString + "<hr></li>");
      }

      $('#number-of-results').text("Your Search Returned " + response.meta.count + " Results")

    },
    error: function(xhr) {
      if (xhr.status === 400) {
        $('#errors').text("Error 400: Bad Request")
      } else if (xhr.status === 401) {
        $('#errors').text("Error 401: Unauthorized")
      } else if (xhr.status === 403) {
        $('#errors').text("Error 403: Forbidden")
      } else if (xhr.status === 404) {
        $('#errors').text("Error 404: Not Found")
      } else {
        $('#errors').text("Error " + xhr.status)
      }

    }
  });
}
