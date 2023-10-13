import React from 'react';

const Filters = ({ languageFilter, sort, handleLanguageFilterChange, handleSortChange, handleFilterChange }) => {
  return (
    <div className='filters'>
      <select className='language_filter' value={languageFilter} onChange={handleLanguageFilterChange}>
        <option value="">Seleccione un lenguaje</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="typescript">Typescript</option>
      </select>
      <select className='sort_filter' value={sort} onChange={handleSortChange}>
        <option className='option' value="">Ordenar por</option>
        <option className='option' value="updated">Actualizado recientemente</option>
        <option className='option' value="stars">Más estrellas</option>
      </select>
      <button className='button_filter' onClick={handleFilterChange}>
        Aplicar Filtros
      </button>
    </div>
  );
};

export default Filters;

