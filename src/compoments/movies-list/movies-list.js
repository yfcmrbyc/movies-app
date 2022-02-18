import React from 'react';
import PropTypes from 'prop-types';

import MoviesItem from '../movies-item/movies-item';
import './movies-list.css';

function MoviesList({sessionID, movies, genres}) {

  const elements = movies.map(movie => (
      <li key={movie.id} className="movies-card">
        <MoviesItem movie={movie} sessionID={sessionID} genres={genres} />
      </li>
    ));

  return (
      <ul>
        { elements }
      </ul>
    );
}

MoviesList.propTypes = {
  sessionID: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MoviesList;
