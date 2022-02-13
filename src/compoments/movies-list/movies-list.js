import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MoviesItem from '../movies-item/movies-item';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';
import AlertMessage from '../alert-message/alert-message';
import './movies-list.css';

export default class MoviesList extends Component {
  static defaultProps = {
    isLoading: false,
    error: false,
    errorMessage: null,
    movies: [],
    query: null,
    totalResults: null,
    page: 1,
  };

  static propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    movies: PropTypes.arrayOf(PropTypes.object),
    query: PropTypes.string,
    totalResults: PropTypes.number,
    page: PropTypes.number,
  };

  componentDidUpdate(prevProps) {
    const query = this.props.query !== prevProps.query;
    const page = this.props.page !== prevProps.page;

    if (query || page) {
      this.renderList(this.props.movies);
    }
  }

  renderList = (movies) =>
    movies.map((movie) => {
      const { id, ...itemProps } = movie;
      return <MoviesItem key={id} {...itemProps} />;
    });

  render() {
    console.log(this.props);
    const { isLoading, error, movies, totalResults, query, errorMessage } = this.props;

    const hasData = movies.length > 0;

    const newError = error ? <ErrorMessage message={errorMessage} /> : null;
    const spiner = isLoading ? <Spiner /> : null;
    const list = hasData ? this.renderList(movies) : null;
    const notFound = totalResults === 0 ? <AlertMessage query={query} /> : null;

    return (
      <ul>
        {newError}
        {spiner}
        {list}
        {notFound}
      </ul>
    );
  }
}
