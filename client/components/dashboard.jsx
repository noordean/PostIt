import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import GroupActions from '../actions/group';
import Home from './home.jsx';
import Paginate from './paginate.jsx';

/**
  * @class Dashboard
  */
class Dashboard extends Component {
/**
  * @constructor
  * @param {String} props
  */
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      groupCount: 0,
      groupLimit: 6,
      groups: []
    };
  }

  componentDidMount() {
    this.props.getGroups(JSON.parse(localStorage.user).id, this.state.groupLimit, 0)
    .then(() => {
      if (this.props.group.groups.length > 0) {
        this.setState({
          groups: this.props.group.groups,
          responseMsg: '',
          groupCount: this.props.group.pageCount
        });
      } else if (this.props.group.responseMsg !== '') {
        this.setState({
          responseMsg: this.props.group.responseMsg
        });
      } else if (this.props.group.error) {
        this.setState({
          responseMsg: 'Sorry, groups could not be fetched'
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        groups: nextProps.group.groups,
        responseMsg: nextProps.group.responseMsg
      });
    }
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.groupLimit);
    this.props.getGroups(JSON.parse(localStorage.user).id, this.state.groupLimit, offset)
    .then(() => {
      this.setState({
        groups: this.props.group.groups
      })
    })
  }

  render() {
    let dashboard;
    if (!localStorage.user) {
      dashboard = <Home/>;
    } else {
      if (this.props.group.loading) {
        dashboard = <div className="text center">Loading...</div>
      } else if (this.state.groups.length > 0) {
        dashboard = this.state.groups.map((group) => {
          return (<div className="col s12 m6" key={group.id}>
                  <div className="card">
                    <div className="card-content grey lighten-4 text">
                      <span className="card-title">{group.groupname}</span>
                      <p>{group.description}</p>
                    </div>
                    <div className="card-action grey lighten-4">
                      <Link to={`message-board/${group.id}/${group.groupname}`} className="red-text text-accent-1">View Message Board</Link>
                    </div>
                  </div>
                </div>);
              });
        } else {
         dashboard = <div className="center">{this.state.responseMsg}</div>
      }
    }

    return (
      <div className="row group-cards">
        {dashboard}
        <div id="paginate">
          <Paginate 
            count={this.state.groupCount}
            LIMIT={this.state.groupLimit}
            clickHandler={this.handlePageClick.bind(this)}
          />
      </div>
    </div>
    );
  }
}


Dashboard.propTypes = {
  group: PropTypes.object,
	getGroups: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    group: state.group
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getGroups: GroupActions.getGroups
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
