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

$('.chips').on('chip.add', (e, chip) => {
   $('#getChips').append(chip.tag + ',');
 });
});
