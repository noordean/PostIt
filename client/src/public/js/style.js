$(document).ready(() => {
  $('.slider').slider({full_width: true});
  $('.modal').modal();

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
  });

let selectedUsers = [];
$('.chips').on('chip.add', (e, chip) => {
  selectedUsers.push(chip.tag);
  $('#getChips').val(selectedUsers.join(' '));
 });
$('.chips').on('chip.delete', (e, chip) => {
  selectedUsers.splice(selectedUsers.indexOf(chip.tag), 1);
   $('#getChips').val(selectedUsers.join(' '));
 });
});
