import 'babel-polyfill';
import React from "react";
import User from './user.js';


export default class Main extends React.Component{
  render(){
    return (
      <div>
        <User/>
      </div>
    )
  }
}