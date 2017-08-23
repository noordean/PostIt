import React, {Component} from "react";

import Header from './header.jsx';
import Footer from './footer.jsx';
import Home from './home.jsx';

export default class Index extends Component {
  componentDidMount() {}
  render(){
    return (
        <div>
            <Header/>
              {this.props.children}
            <Footer/>
        </div>
    );
  }
}