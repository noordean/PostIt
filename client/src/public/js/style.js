import axios from 'axios';

$(document).ready(() => {
  $('.slider').slider({ full_width: true });
  $('.modal').modal();
  // side nav
  $('.dropdown-button').dropdown();
  $('.button-collapse').sideNav({
    menuWidth: 240,
    closeOnClick: false
  });
  $('.collapsible').collapsible();

  // getting username from database to fill autocomplete input
  const users = {};
  $('#addMembers').click(() => {
    axios.get('/api/users', {
      headers: {
        userrs: $('#getMembers').val(),
        token: JSON.parse(localStorage.user).token
      }
    })
      .then((response) => {
        const autoCompleteValues = {};
        response.data.message.forEach((user) => {
          autoCompleteValues[user.username] = null;
          users[user.username] = user.id;
        });
        $('.chips-autocomplete').material_chip({
          placeholder: 'Enter a username',
          secondaryPlaceholder: 'Add more members',
          autocompleteOptions: {
            data: autoCompleteValues,
            limit: Infinity,
            minLength: 1,
          }
        });
      });
  });

  const selectedUsers = [];
  $('.chips').on('chip.add', (e, chip) => {
    selectedUsers.push(users[chip.tag]);
    $('#getChips').val(selectedUsers.join(' '));
  });
  $('.chips').on('chip.delete', (e, chip) => {
    selectedUsers.splice(selectedUsers.indexOf(users[chip.tag]), 1);
    $('#getChips').val(selectedUsers.join(' '));
  });
});
