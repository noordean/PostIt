import React, {Component} from "react";

export default class MessageBoard extends Component{
  render(){
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

        <div className="row group-cards">
          <div className="col s3">
            <a id="slideOut" href="" data-activates="slide-out" className="button-collapse"><i className="material-icons red-text">menu</i></a>
          </div>
          <div className="col s9">
            <div className="row">
              <div className="col s10">
                <h6 className="media-heading">Nurudeen Ibrahim</h6>
                <p className="col-lg-10">Location H-2, Ayojan Nagar, Near Gate-3, Near Shreyas Crossing Dharnidhar Derasar,Paldi, Ahmedabad 380007, Ahmedabad, India Phone 091 37 669307 Email aapamdavad.district@gmail.com jjhjksx n,k,hklfc nklhjklhlif lkhilhildc klhjilhildfm nkjhiohsf ,nbjkhiohsf nhh</p>
              </div>
              <div className="col s2">
                <small className="pull-right time"><i className="fa fa-clock-o"></i> 12:10am</small>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col s10">
                <h6 className="media-heading">Nurudeen Ibrahim</h6>
                <p className="col-lg-10">Location H-2, Ayojan Nagar, Near Gate-3, Near Shreyas Crossing Dharnidhar Derasar,Paldi, Ahmedabad 380007, Ahmedabad, India Phone 091 37 669307 Email aapamdavad.district@gmail.com jjhjksx n,k,hklfc nklhjklhlif lkhilhildc klhjilhildfm nkjhiohsf ,nbjkhiohsf nhh</p>
              </div>
              <div className="col s2">
                <small className="pull-right time"><i className="fa fa-clock-o"></i> 12:10am</small>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col s10">
                <h6 className="media-heading">Nurudeen Ibrahim</h6>
                <p className="col-lg-10">Location H-2, Ayojan Nagar, Near Gate-3, Near Shreyas Crossing Dharnidhar Derasar,Paldi, Ahmedabad 380007, Ahmedabad, India Phone 091 37 669307 Email aapamdavad.district@gmail.com jjhjksx n,k,hklfc nklhjklhlif lkhilhildc klhjilhildfm nkjhiohsf ,nbjkhiohsf nhh</p>
              </div>
              <div className="col s2">
                <small className="pull-right time"><i className="fa fa-clock-o"></i> 12:10am</small>
              </div>
            </div>
            <div className="row">
              <form className="col s10">
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea white"></textarea>
                    <label htmlFor="textarea1">Message</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
