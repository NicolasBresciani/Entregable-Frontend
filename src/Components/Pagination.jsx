import React from 'react';

const Pagination = ({ resultsRepo, resultsPerPage, paginate }) => {
  return (
    <div className='pagination'>
      {[...Array(Math.ceil(resultsRepo.length / resultsPerPage)).keys()].map(number => (
        <button key={number} onClick={() => paginate(number + 1)} className='page_button'>
          {number + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
