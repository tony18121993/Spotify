import React, { useState } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../svgs/play.svg';

const SearchBar = ({ dataPlaylists }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);
    // Filtrar los resultados cuando cambia el valor del input
    const filteredResults = dataPlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredResults);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredResults = dataPlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          value={query}
          onChange={handleChange}
        />
        
      </form>
      
      <div className="cardsWrap">
        <div className="cardsWrapInner">
          {searchResults.map((playlist, id) => (
            <Link to={`playlist/${playlist.id}`} key={id}>
              <div className="card" key={id}>
                <div className="cardImage">
                  <img src={playlist.img} alt="Pic 1" />
                </div>
                <div className="cardContent">
                  <h3>{playlist.name}</h3>
                  <span>{playlist.desc}</span>
                </div>
                <span className="playIcon">
                  <PlayIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
