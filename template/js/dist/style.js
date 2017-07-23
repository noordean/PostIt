'use strict';

$(document).ready(function () {
  $(".dropdown-button").dropdown();
  $('.button-collapse').sideNav({
    menuWidth: 240,
    closeOnClick: false
  });
  $('.collapsible').collapsible();
  $('input.autocomplete').autocomplete({
    data: {
      "<a href='#'>Apple</a>": null,
      "Microsoft": null,
      "Google": 'https://placehold.it/250x250'
    },
    limit: 20,
    minLength: 1
  });
});