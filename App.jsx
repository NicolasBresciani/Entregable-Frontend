import React, { useState } from 'react';
import axios from 'axios';
import Header from './src/Components/Header.jsx';
import Filters from './src/Components/Filters.jsx';
import Pagination from './src/Components/Pagination.jsx';
import ResultsList from './src/Components/ResultsList.jsx';
import SearchBar from './src/Components/SearchBar.jsx';
import UserDetails from './src/Components/UserDetails.jsx';

const App = () => {
  const [search, setSearch] = useState('');
  const [resultsRepo, setResultsRepo] = useState([]);
  const [resultsUser, setResultsUser] = useState(null);
  const [resultsUserRepo, setResultsUserRepo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const [languageFilter, setLanguageFilter] = useState('');
  const [sort, setSort] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLanguageFilterChange = (e) => {
    setLanguageFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = () => {
    searchGitHubRepo();
  };

  const clearResults = () => {
    setResultsRepo([]);
    setResultsUser(null);
    setResultsUserRepo(null);
    setError(null);
  };

  const searchGitHubRepo = async () => {
    clearResults();
    setError(null);
    try {
      let apiUrl = `https://api.github.com/search/repositories?q=${search}`;
      if (languageFilter) {
        apiUrl += `+language:${languageFilter}`;
      }
      if (sort) {
        apiUrl += `&sort=${sort}`;
      }
      const response = await axios.get(apiUrl);

      if (response.data.items.length === 0) {
        setError('No se encontraron resultados');
      } else {
        setError(null);
        setResultsRepo(response.data.items);
        setResultsUser(null);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error al obtener los datos del repositorio: ', error);
      setError('Error al obtener los datos del repositorio');
    }
  };

  const searchGitUser = async () => {
    clearResults();
    setError(null);
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${search}`);
      const userRepoResponse = await axios.get(`https://api.github.com/users/${search}/repos`);
      setResultsUser(userResponse.data);
      setResultsUserRepo(userRepoResponse.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al obtener los datos del usuario o sus repositorios: ', error);
      setError('Error al obtener los datos del usuario o sus repositorios');
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResultsRepo = resultsRepo.slice(indexOfFirstResult, indexOfLastResult);
  const currentResultsUser = resultsUserRepo ? resultsUserRepo.slice(indexOfFirstResult, indexOfLastResult) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <SearchBar
        search={search}
        handleInputChange={handleInputChange}
        searchGitHubRepo={searchGitHubRepo}
        searchGitUser={searchGitUser}
      />
      <Filters
        languageFilter={languageFilter}
        sort={sort}
        handleLanguageFilterChange={handleLanguageFilterChange}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
      />
      {error && (
        <p className='error'>{error}</p>
      )}
      <ResultsList
        resultsRepo={resultsRepo}
        currentResultsRepo={currentResultsRepo}
      />
      {resultsRepo.length > resultsPerPage && (
        <Pagination
          resultsRepo={resultsRepo}
          resultsPerPage={resultsPerPage}
          paginate={paginate}
        />
      )}
      {resultsUser && (
        <UserDetails
          resultsUser={resultsUser}
          currentResultsUser={currentResultsUser}
        />
      )}
    </>
  );
};

export default App;




