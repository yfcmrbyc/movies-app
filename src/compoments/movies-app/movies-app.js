import React, { Component } from 'react';
import { Tabs, Pagination } from 'antd';
import debounce from 'lodash.debounce';

import 'antd/dist/antd.css';
import './movies-app.css';
import MovieService from '../api/api';
import SearchBar from '../search-bar/search-bar';
import MoviesList from '../movies-list/movies-list';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';
import { GenresProvider } from '../genres-context/genres-context';

const { TabPane } = Tabs;

export default class MoviesApp extends Component {
  movieService = new MovieService();

  state = {
    isLoaded: false,
    error: false,
    errorMessage: '',
    currentTab: 'search',
    currentPage: 1,
    searchedMovies: {},
    ratedMovies: [],
    genres: [],
    query: 'return',
  };

  componentDidMount() {
    this.searchMovies('return');

    this.movieService.getGenres().then((res) => {
      this.setState(() => ({
        genres: [...res.genres],
      }));
    });
  }

  componentDidCatch(error) {
    this.setState(() => ({
      error: true,
      errorMessage: error,
    }));
  }

  searchMovies = (query, currentPage = 1) => {
    this.setState(() => ({
      isLoaded: false,
    }));

    this.movieService
      .getAllMovies(query, currentPage)
      .then((res) => {
        this.setState(() => ({
          isLoaded: true,
          query,
          currentPage,
          searchedMovies: { ...res },
        }));
      })
      .catch((err) => {
        this.setState(() => ({
          isLoaded: true,
          error: true,
          errorMessage: err,
        }));
      });
  };

  changeCurentTab = (key) => {
    const sessionData = JSON.parse(sessionStorage.getItem('sessionRatedMovies'));

    if (sessionData) {
      const { ratedMovies } = sessionData;

      this.setState(() => ({
        currentTab: key,
        ratedMovies: [...ratedMovies],
      }));
    }
  };

  changePage = (page) => {
    this.searchMovies(this.state.query, page);
    this.setState(() => ({
      currentPage: page,
    }));
  };

  render() {
    const { isLoaded, error, errorMessage, currentTab, searchedMovies, ratedMovies, genres, currentPage } = this.state;

    const spinerApp = !isLoaded ? <Spiner /> : null;
    const errorApp = error ? <ErrorMessage message={errorMessage} /> : null;
    const moviesList = currentTab === 'search' ? searchedMovies.results : ratedMovies;
    const total = currentTab === 'search' ? searchedMovies.total_results : ratedMovies.length;
    const movies = isLoaded ? <MoviesList movies={moviesList} /> : null;

    return (
      <GenresProvider value={genres}>
        <main className="app-container">
          <Tabs defaultActiveKey="search" onChange={this.changeCurentTab}>
            <TabPane tab="Search" key="search">
              <SearchBar searchMovies={debounce(this.searchMovies, 800)} />
              {errorApp}
              {spinerApp}
              {movies}
            </TabPane>
            <TabPane tab="Rated" key="rated">
              {errorApp}
              {spinerApp}
              {movies}
            </TabPane>
          </Tabs>
          <Pagination
            size="small"
            total={total}
            defaultPageSize={20}
            showSizeChanger={false}
            current={currentPage}
            onChange={this.changePage}
          />
        </main>
      </GenresProvider>
    );
  }
}
