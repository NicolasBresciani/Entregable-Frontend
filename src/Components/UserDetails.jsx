import React from 'react';
import { FaStar } from "react-icons/fa";

const UserDetails = ({ resultsUser, currentResultsUser }) => {
  return (
    <div className='container'>
      <img className='avatar' src={resultsUser.avatar_url} alt={resultsUser.login} />
      <p className='paragraph'>Nombre de Usuario: {resultsUser.login}</p>
      <p className='paragraph'>Biografía: {resultsUser.bio}</p>
      <p className='paragraph'>Seguidores: {resultsUser.followers}</p>
      <p className='paragraph'>Repositorios: {resultsUser.public_repos}</p>

      <h2>Repositorios Públicos:</h2>
      {currentResultsUser.length > 0 && (
        <ul>
          {currentResultsUser.map((repo) => (
            <li className='list' key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
              <p>{repo.description}</p>
              <div>Estrellas: {repo.stargazers_count} <FaStar className='star' /></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetails;
