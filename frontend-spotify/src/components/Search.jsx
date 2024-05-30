import React, { useState, useEffect, useRef } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../svgs/play.svg';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResultsPlaylists, setSearchResultsPlaylists] = useState([]);
  const [searchResultsArtists, setSearchResultsArtists] = useState([]);
  const searchTimeout = useRef(null);

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);
    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    // Set a new timeout to delay the search
    searchTimeout.current = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    fetchSearchResults(query);
  };

  const fetchSearchResults = async (searchTerm) => {
    try {
      // Fetch playlists
      const playlistsResponse = await fetch(`http://localhost:5186/ListasporNombre/${searchTerm}`);
      const playlistsData = await playlistsResponse.json();
      setSearchResultsPlaylists(playlistsData);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setSearchResultsPlaylists([]); // Reset playlists results if there's an error
    }

    try {
      // Fetch artists
      const artistsResponse = await fetch(`http://localhost:5186/ArtistasporNombre/${searchTerm}`);
      const artistsData = await artistsResponse.json();
      setSearchResultsArtists(artistsData);
    } catch (error) {
      console.error('Error fetching artists:', error);
      setSearchResultsArtists([]); // Reset artists results if there's an error
    }
  };

  return (
    <div className='ms-3'>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          value={query}
          onChange={handleChange}
        />
      </form>
      

      {searchResultsArtists.length > 0 && (
        <div className="cardsWrap">
          <h2>Artistas</h2>
          <div className="cardsWrapInner">
            {searchResultsArtists.map((artist, id) => (
              <Link to={`/inicio/artista/` + artist.idArtista} key={id}>
                <div className="card" key={id}>
                  <div className="cardImage">
                    <img src={artist.imagenPrimerAlbum} alt={artist.nombre} />
                  </div>
                  <div className="cardContent">
                    <h3>{artist.nombre}</h3>
                    <span>{artist.descripcion}</span>
                  </div>
                  <span className="playIcon">
                    <PlayIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      
{searchResultsPlaylists.length > 0 && (
        <div className="cardsWrap">
          <h2>Listas de Reproducción</h2>
          <div className="cardsWrapInner">
            {searchResultsPlaylists.map((playlist, id) => (
              <Link to={`/inicio/listas/${playlist.idLista}`} key={id}>
                <div className="card">
                  <div className="cardImage">
                    <img src="https://cdn-icons-png.flaticon.com/512/565/565267.png" alt={playlist.name || playlist.nombre} />
                  </div>
                  <div className="cardContent">
                    <h3>{playlist.nombre}</h3>
                    <span>{playlist.publica ? "Publica" : "Privada"}</span>
                  </div>
                  <span className="playIcon">
                    <PlayIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>

    
  );
};

export default SearchBar;
