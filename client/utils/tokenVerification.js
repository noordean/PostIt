import { browserHistory } from 'react-router';

const tokenVerification = () => {
  localStorage.removeItem('user');
  browserHistory.push('/signin');
  window.location.reload();
};

export default tokenVerification;
