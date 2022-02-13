import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MoviesItem from '../movies-item/movies-item';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';
import './movies-list.css';

export default class MoviesList extends Component {

  static defaultProps = {
    isLoaded: false,
    error: false,
    movies: []
  }

  static propTypes = {
    isLoaded: PropTypes.bool,
    error: PropTypes.bool,
    movies: PropTypes.arrayOf(PropTypes.object)
  }

  componentDidMount() {
  }

  renderList = (movies) => movies.map((movie) => {
    const { id, ...itemProps } = movie;
    return <MoviesItem key={id} {...itemProps} />
  });

  render() {
    const { isLoaded, error, movies } = this.props;

    const hasData = movies.length > 0;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spiner = !isLoaded ? <Spiner /> : null;
    const list = hasData ? this.renderList(movies) : null;

    return (
      <ul>
        {errorMessage}
        {spiner}
        {list}
      </ul>
    );
  }
}
