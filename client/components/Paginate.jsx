import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginate = (props) => {
  return (
    <ReactPaginate
      previousLabel={'Prev'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={Math.ceil(props.count/props.LIMIT)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.clickHandler}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
};

export default Paginate;
