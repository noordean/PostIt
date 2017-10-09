import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export const GroupList = props => (<div>{ props.groups.map(group => (<div
  className="col s12 m6"
  key={group.id}
>
  <div className="card">
    <div className="card-content grey lighten-4 text">
      <span className="card-title">{group.groupname}</span>
      <p className="group-desc">{group.description}</p>
    </div>
    <div className="card-action grey lighten-4">
      <Link
        to={`message-board/${group.id}/${group.groupname}`}
        className="red-text text-accent-1"
      >
          View Message Board
      </Link>
    </div>
  </div>
</div>))}
</div>);

GroupList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default GroupList;
