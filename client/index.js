import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from "./store.js";
import Inndex from './components/index.jsx';
import Home from './components/home.jsx';
import Signup from './components/signup.jsx';
import Signin from './components/signin.jsx';
import Dashboard from './components/dashboard.jsx';
import MessageBoard from './components/messageboard.jsx';
require('./src/public/js/style.js');

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

ReactDOM.render(<Provider store={store}>
 <Router history={browserHistory}>
   <Route path="/" component={Inndex}>
     <IndexRoute component={Home}/>
     <Route path="signup" component={Signup}/>
     <Route path="signin" component={Signin}/>
     <Route path="dashboard" component={Dashboard}/>
     <Route path="message-board" component={MessageBoard}/>
   </Route>  
 </Router>
</Provider>,
document.getElementById("root")
);