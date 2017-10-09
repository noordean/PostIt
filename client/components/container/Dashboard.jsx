import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GroupActions from '../../actions/GroupActions';
import UserActions from '../../actions/UserActions';
import Home from '../presentation/Home.jsx';
import Paginate from '../presentation/Paginate.jsx';
import GroupList from '../presentation/GroupList.jsx';

/**
  * @class Dashboard
  */
export class Dashboard extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      groupCount: 0,
      groupLimit: 6,
      groups: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
  * description: controls what happens after component get rendered
  *
  * @return {void} void
  */
  componentDidMount() {
    this.props.getGroups(this.state.groupLimit, 0);
    this.getNotificationHandler();
  }

  /**
  * description: controls what happens when state is about to change
  *
  * @param {object} nextProps The next state
  *
  * @return {void} void
  */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        groups: nextProps.group.groups,
        responseMsg: nextProps.group.responseMsg
      });
    }
  }

  /**
  * description: controls displays in app notifications
  *
  * @return {void} void
  */
  getNotificationHandler() {
    this.props.getNotifications(JSON.parse(localStorage.user).id).then(() => {
      if (this.props.appNotification.notification.length > 0) {
        const notifications = this.props.appNotification.notification.map(
          notes => `You have a new message in ${notes.groupName},
          from ${notes.postedby}`);
        this.props.deleteNotification(JSON.parse(localStorage.user).id);
        return Materialize.toast(
          notifications.join('<br>'), 10000,
          'red darken-4 white-text rounded');
      }
    });
  }

  /**
  * description: controls pagination
  *
  * @param {object} groupPages The pagination object
  *
  * @return {void} void
  */
  handlePageClick(groupPages) {
    const selected = groupPages.selected;
    const offset = Math.ceil(selected * this.state.groupLimit);
    this.props.getGroups(this.state.groupLimit, offset);
  }

  /**
  * description: renders the component
  *
  * @return {void} void
  */
  render() {
    let dashboard;
    if (!localStorage.user) {
      dashboard = <Home />;
    } else if (this.props.group.loading) {
      dashboard = <div className="text center loading-groups">Loading...</div>;
    } else if (this.state.groups.length > 0) {
      dashboard = <GroupList groups={this.state.groups} />;
    } else {
      dashboard = <div className="center">{this.props.group.responseMsg}</div>;
    }

    return (
      <div className="row group-cards">
        {dashboard}
        <div id="paginate">
          <Paginate
            count={this.props.group.pageCount}
            LIMIT={this.state.groupLimit}
            clickHandler={this.handlePageClick}
          />
        </div>
      </div>
    );
  }
}


Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  group: PropTypes.shape({
    error: PropTypes.bool,
    responseMsg: PropTypes.string,
    loading: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.object.isRequired),
    pageCount: PropTypes.number
  }).isRequired,
  appNotification: PropTypes.shape({
    error: PropTypes.bool,
    responseMsg: PropTypes.string,
    loading: PropTypes.bool,
    notification: PropTypes.arrayOf(PropTypes.object.isRequired)
  }).isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  appNotification: state.appNotification
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getGroups: GroupActions.getGroups,
  getNotifications: UserActions.getNotifications,
  deleteNotification: UserActions.deleteNotification
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
