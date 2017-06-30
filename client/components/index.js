import 'babel-polyfill';
import React, {Component} from "react";
import Header from './header';
import Footer from './footer';
import Home from './home';

export default class Index extends Component{
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