import React, { Component } from 'react';
import { Pagination, Tabs } from 'antd';
import debounce from 'lodash.debounce';

import 'antd/dist/antd.css';
import './movies-app.css';
import MovieService from '../api/api';
import SearchBar from '../search-bar/search-bar';

const { TabPane } = Tabs;

export default class MoviesApp extends Component {
  movieService = new MovieService();

  state = {
    searchResult: {},
    currentPage: 1,
    isLoading: false,
    error: false,
    errorMessage: null,
    query: null,
  };

  componentDidMount() {
    this.searchMovies('return');
  }

  searchMovies = (query, currentPage = 1) => {
    this.setState({
      isLoading: true,
    });

    this.movieService
      .getAllMovies(query, currentPage)
      .then((res) => {
        console.log(res);
        this.setState({
          isLoading: false,
          query,
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
    const {
      currentPage,
      searchResult: { results, total_results: total },
      ...moviesData
    } = this.state;

    return (
      <main className="app-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Search" key="1">
            <SearchBar
              {...moviesData}
              page={currentPage}
              movies={results}
              totalResults={total}
              searchMovies={debounce(this.searchMovies, 800)}
            />
          </TabPane>
          <TabPane tab="Rated" key="2">
            Content of Tab Pane 2
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
    );
  }
}
