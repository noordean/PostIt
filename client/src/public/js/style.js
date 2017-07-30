$(document).ready(() => {
  $('.slider').slider({ full_width: true });
  $('.modal').modal();

  // side nav
  $(".dropdown-button").dropdown();
  $('.button-collapse').sideNav({
    menuWidth: 240,
    closeOnClick: false
  });
  $('.collapsible').collapsible();

  // getting username from database to fill autocomplete input
  $.get("https://postit-api.herokuapp.com/api/users", function(data){
     let autoCompleteValues = {};
     data.message.forEach(function(user){
       autoCompleteValues[user.username] = null;
     });

    $('.chips-autocomplete').material_chip({
    placeholder: 'Enter a username',
    secondaryPlaceholder: 'Add members',
    autocompleteOptions: {
      data: autoCompleteValues,
      limit: Infinity,
      minLength: 1,
    }
  });
    $('.chip-autocomplete').material_chip({
    placeholder: 'Enter a username',
    secondaryPlaceholder: 'Add members',
    autocompleteOptions: {
      data: autoCompleteValues,
      limit: Infinity,
      minLength: 1,
    }
  });
  });

let selectedUsers = [];
$('.chips').on('chip.add', (e, chip) => {
  selectedUsers.push(chip.tag);
  $('#getChips').val(selectedUsers.join(' '));
 });
$('.chips').on('chip.delete', (e, chip) => {
  selectedUsers.splice(selectedUsers.indexOf(chip.tag), 1);
  membersPicked.splice(membersPicked.indexOf(chip.tag), 1);
   $('#getChips').val(selectedUsers.join(' '));
  $('#getMemberChips').val(membersPicked.join(' '));
 });

let membersPicked = [];
$('.chip').on('chip.add', (e, chip) => {
  membersPicked.push(chip.tag);
  $('#getMemberChips').val(membersPicked.join(' '));
 });
$('.chip').on('chip.delete', (e, chip) => {
  membersPicked.splice(membersPicked.indexOf(chip.tag), 1);
  $('#getMemberChips').val(membersPicked.join(' '));
 });
});
