import React from 'react';

const SearchBar = ({ search, handleInputChange, searchGitHubRepo, searchGitUser }) => {
  return (
    <div className='searcher'>
      <input
        name='input'
        className='input'
        type="text"
        value={search}
        onChange={handleInputChange}
      />
      <button className='button' onClick={searchGitHubRepo}>Buscar Repositorios</button>
      <button className='button' onClick={searchGitUser}>Buscar Usuario</button>
    </div>
  );
};

export default SearchBar;
