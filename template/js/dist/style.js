'use strict';

$(document).ready(function () {
  $(".dropdown-button").dropdown();
  $('.button-collapse').sideNav({
    menuWidth: 240,
    closeOnClick: false
  });
  $('.collapsible').collapsible();
});