import axios from 'axios';

$(document).ready(() => {
  // getting username from database to fill autocomplete input
  const users = {};
  $('#addMembers').click(() => {
    axios.get('/api/v1/users', {
      headers: {
        userrs: $('#getMembers').val(),
        token: JSON.parse(localStorage.user).token
      }
    })
      .then((response) => {
        console.log(response.data);
        console.log('users jquery hereeeeee');
        const autoCompleteValues = {};
        response.data.users.forEach((user) => {
          autoCompleteValues[user.username] = null;
          users[user.username] = user.id;
        });
        $('.chips-autocomplete').material_chip({
          placeholder: 'Add more members',
          secondaryPlaceholder: 'Enter a username',
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
