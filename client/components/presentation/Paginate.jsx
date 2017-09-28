import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const Paginate = (props) => {
  if (props.count < 7) {
    return <div />;
  }
  return (<ReactPaginate
    previousLabel={'Prev'}
    nextLabel={'Next'}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={Math.ceil(props.count / props.LIMIT)}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={props.clickHandler}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
  />);
};

Paginate.propTypes = {
  count: PropTypes.number.isRequired,
  LIMIT: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default Paginate;
