import React from 'react';
import { FaStar } from "react-icons/fa";

const ResultsList = ({ resultsRepo, currentResultsRepo }) => {
  return (
    <div>
      {currentResultsRepo.length > 0 && (
        <ul>
          {currentResultsRepo.map((item) => (
            <li className='list' key={item.id}>
              Nombre del Repositorio: {item.full_name}
              <a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a>
              Descripción: {item.description}<br />
              <div>Estrellas: {item.stargazers_count} <FaStar className='star' /></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsList;


