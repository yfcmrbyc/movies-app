import React, { Component } from 'react';
import { Pagination, Tabs } from 'antd';

import 'antd/dist/antd.css';
import './movies-app.css';
import MovieService from '../api/api';
import SearchBar from '../search-bar/search-bar';

const { TabPane } = Tabs;

export default class MoviesApp extends Component {

  movieService = new MovieService();

  state = {
    moviesData: {
      isLoaded: false,
      error: false,
      movies: []
    },
   // totalPages: null,
    totalResults: null,
    currentPage: 1
  };

  componentDidMount() {
    this.movieService.getAllMovies('return', 1)
      .then(res => {
        console.log(res);
        this.setState({
          moviesData: {
            isLoaded: true,
            movies: [...res.results]
          },
          totalResults: res.total_results
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          moviesData: {
            isLoaded: true,
            error: true
          }
        })
      })
  }

  render() {

    const { moviesData, totalResults, currentPage} = this.state;

    return (
      <main className="app-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Search" key="1">
            <SearchBar {...moviesData} />
          </TabPane>
          <TabPane tab="Rated" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
        <Pagination 
          size="small" 
          total={totalResults}
          defaultPageSize={20}
          showSizeChanger={false}
          current={currentPage}
        />
      </main>
    );
  }
}
