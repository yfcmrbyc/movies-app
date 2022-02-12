import React, { Component } from 'react';

import MovieService from '../api/api';
import MoviesItem from '../movies-item/movies-item';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';
import './movies-list.css';

const ListView = ({ movies }) =>
  movies.map((movie) => (
    <li key={movie.id} className="movies-card">
      <MoviesItem
        name={movie.title}
        imgUrl={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
        overview={movie.overview}
        releaseDate={new Date(movie.release_date)}
        rate={movie.vote_average}
      />
    </li>
  ));

export default class MoviesList extends Component {
  movieService = new MovieService();

  state = {
    error: null,
    isLoaded: false,
    movies: [],
  };

  componentDidMount() {
    this.movieService.getAllMovies().then(
      (result) => {
        this.setState({
          isLoaded: true,
          movies: result.results,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    const { isLoaded, error, movies } = this.state;

    const hasData = isLoaded || !error;

    const errorMessage = error ? <ErrorMessage erroe={error.message} /> : null;
    const spiner = !isLoaded ? <Spiner /> : null;
    const list = hasData ? <ListView movies={movies} /> : null;

    return (
      <ul>
        {errorMessage}
        {spiner}
        {list}
      </ul>
    );
  }
}
