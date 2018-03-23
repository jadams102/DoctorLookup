import $ from 'jquery';
import './styles.css';
import { SearchDoctors } from './../src/DoctorLookup.js';

$(document).ready(function(){
  $('#user-form').submit(function(event){
    $('ul#result-list').empty();
    SearchDoctors()
    event.preventDefault();
      })
    })
