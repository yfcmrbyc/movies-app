import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import MovieService from '../api/api';
import MoviesList from '../movies-list/movies-list';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';
import AlertMessage from '../alert-message/alert-message';

export default class SearchBar extends Component {
  movieService = new MovieService();

  static propTypes = {
    sessionID: PropTypes.string.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    searchResult: {},
    currentPage: 1,
    isLoading: true,
    error: false,
    errorMessage: null,
    sessionID: '',
  };

  componentDidMount() {
    const { sessionID, isLoaded, error, errorMessage } = this.props;

    console.log(isLoaded);

    if (isLoaded) {
      this.searchRateMovies(sessionID);

      this.setState(() => ({
        sessionID,
      }));
    } else if (error) {
      this.setState(() => ({
        isLoading: false,
        error,
        errorMessage,
      }));
    }
  }

  searchRateMovies = (sessionID) => {
    this.setState({
      isLoading: true,
    });

    this.movieService
      .getGuestSessionMovies(sessionID)
      .then((res) => {
        this.setState({
          isLoading: false,
          searchResult: { ...res },
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: true,
          errorMessage: err.message,
        });
      });
  };

  changePage = (page) => {
    this.setState({
      currentPage: page,
    });
    this.searchMovies(this.state.query, page);
  };

  render() {
    const { searchResult, isLoading, error, errorMessage, sessionID, currentPage, query } = this.state;
    const { total_pages: total, results: movies, total_results: totalResults } = searchResult;

    const hasData = totalResults > 0;

    const errorSearchBar = error ? <ErrorMessage message={errorMessage} /> : null;
    const spinerSearchBar = isLoading ? <Spiner /> : null;
    const listMovies = hasData ? <MoviesList movies={movies} sessionID={sessionID} genres={this.props.genres} /> : null;
    const notFound = totalResults === 0 ? <AlertMessage query={query} /> : null;

    return (
      <>
        {errorSearchBar}
        {spinerSearchBar}
        {listMovies}
        {notFound}
        <Pagination
          size="small"
          total={total}
          defaultPageSize={20}
          showSizeChanger={false}
          current={currentPage}
          onChange={this.changePage}
        />
      </>
    );
  }
}
