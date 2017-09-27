
const displayError = (message) => {
  Materialize.toast(
    message, 2000,
    'red darken-4 white-text rounded');
};

export default displayError;
