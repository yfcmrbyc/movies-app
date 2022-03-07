import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import MoviesItem from '../movies-item/movies-item';
import './movies-list.css';

export default class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object),
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
  };

  static defaultProps = {
    movies: [],
  };

  state = {
    ratedMovies: [],
  };

  componentDidMount() {
    const sessionData = JSON.parse(sessionStorage.getItem('sessionRatedMovies'));

    this.setState(() => sessionData);
  }

  componentDidUpdate(prevState) {
    if (this.state.ratedMovies !== prevState.ratedMovies) {
      sessionStorage.setItem('sessionRatedMovies', JSON.stringify(this.state));
      this.renderItems(this.state.ratedMovies);
    }
  }

  rateMovie = (id, value) => {
    const [ratedMovie] = this.props.movies.filter((movie) => movie.id === id);
    const newMovie = { ...ratedMovie, rating: value };

    this.setState(({ ratedMovies }) => {
      const idx = ratedMovies.findIndex((element) => element.id === id);

      if (idx < 0) {
        return {
          ratedMovies: [...ratedMovies, newMovie],
        };
      } else {
        return {
          ratedMovies: [...ratedMovies.slice(0, idx), newMovie, ...ratedMovies.slice(idx + 1)],
        };
      }
    });
  };

  renderItems = (movies) =>
    movies.map((movie) => (
      <li key={movie.id} className="movies-card">
        <MoviesItem movie={movie} rateMovie={this.rateMovie} tab={this.props.tab} />
      </li>
    ));

  render() {
    const { movies, total, page, changePage } = this.props;

    return (
      <>
        <ul>{this.renderItems(movies)}</ul>
        {total > 0 && (
          <Pagination
            size="small"
            total={total}
            defaultPageSize={20}
            showSizeChanger={false}
            current={page}
            onChange={changePage}
          />
        )}
      </>
    );
  }
}
