import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from "./store.js";
import Inndex from './components/index';
import Home from './components/home';
import Signup from './components/signup';
import Signin from './components/signin';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

ReactDOM.render(<Provider store={store}>
 <Router history={browserHistory}>
   <Route path="/" component={Inndex}>
     <IndexRoute component={Home}/>
     <Route path="signup" component={Signup}/>
     <Route path="login" component={Signin}/>
   </Route>  
 </Router>
</Provider>,
document.getElementById("root")
);