$(document).ready(() => {
  $('.slider').slider({full_width: true});
  $('.modal').modal();
 $('.chips-autocomplete').material_chip({
    placeholder: 'Enter a username',
    secondaryPlaceholder: 'Add members',
    autocompleteOptions: {
      data: {
        'Steven': null,
        'Busayo': null,
        'Google': null,
        'Dunni': null,
        'Lanre': null,
        'Sholape': null
      },
      limit: Infinity,
      minLength: 1,
    }
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
