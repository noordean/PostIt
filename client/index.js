import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';
import Inndex from './components/Index.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import Dashboard from './components/Dashboard.jsx';
import MessageBoard from './components/MessageBoard.jsx';
import ConfirmResetPassword from './components/ConfirmResetPassword.jsx';
import ArchiveMessage from './components/ArchiveMessage.jsx';
import authorization from './utils/authorization';

require('./src/public/js/style.js');


if (localStorage.user) {
  authorization(JSON.parse(localStorage.user).token);
}

ReactDOM.render(<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Inndex}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="message-board/:groupID/:groupName" component={MessageBoard} />
      <Route path="reset-password/:token" component={ConfirmResetPassword} />
      <Route path="archive-board/:groupId" component={ArchiveMessage} />
    </Route>
  </Router>
</Provider>,
document.getElementById('root')
);
