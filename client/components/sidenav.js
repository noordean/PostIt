import React, {Component} from "react";


export default class SideNav extends Component{
  render() {
    return (
        <div>
          <ul id="slide-out" className="side-nav red darken-4 white-text">
            <li><div className="user-view">Group Name</div></li>
            <li><a className='dropdown-button' href='#' data-activates='dropdown2'>Add member</a></li>
            <li><i className="material-icons prefix">account_circle</i><a className='dropdown-button' href='#' data-activates='dropdown3'>Members<i className="material-icons right">arrow_drop_down</i></a></li>
          </ul>
          <ul id='dropdown3' className='dropdown-content'>
            <li><a href="#!">evidence</a></li>
            <li><a href="#!">Babatunde</a></li>
            <li><a href="#!">supermike</a></li>
            <li><a href="#!">Pythagoras</a></li>
            <li><a href="#!">Jchinonso</a></li>
          </ul>

          <ul id='dropdown2' className='dropdown-content'>
            <li><input type="text" id="autocomplete-input" className="autocomplete"/></li>
          </ul>
            <a id="slideOut" href="" data-activates="slide-out" className="button-collapse"><i className="material-icons red-text">menu</i></a>
        </div>
    );
  }
}
