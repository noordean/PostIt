import React, {Component} from "react";

import Dashboard from './dashboard.jsx';

export default class Home extends Component{
  render() {
    if (localStorage.user) {
      return <Dashboard/>
    }
    return (
          <blockquote> A small group of thoughtful people could change the world</blockquote>
    )
  }
}