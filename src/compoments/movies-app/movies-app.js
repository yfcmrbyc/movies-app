import React, { Component } from 'react';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';
import './movies-app.css';
import SearchBar from '../search-bar/search-bar';
import MoviesList from '../movies-list/movies-list';

export default class MoviesApp extends Component {
  state = {};

  render() {
    const { moviesData } = this.state;

    return (
      <main className="app-container">
        <SearchBar />
        <MoviesList movies={moviesData} />
        <Pagination size="small" total={50} />
      </main>
    );
  }
}
