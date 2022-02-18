import React, { Component } from 'react';
import { Tabs } from 'antd';

import 'antd/dist/antd.css';
import './movies-app.css';
import MovieService from '../api/api';
import SearchBar from '../search-bar/search-bar';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../error-message/error-message';

const { TabPane } = Tabs;

export default class MoviesApp extends Component {
  movieService = new MovieService();

  state = {
    sessionID: '',
    isLoaded: false,
    error: false,
    errorMessage: '',
    genres: [],
  };

  componentDidMount() {
    this.movieService
      .getGenres()
      .then((res) => {
        this.setState(() => ({
          genres: res.genres,
        }));
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
          error: true,
          errorMessage: err.message,
        });
      });

    this.movieService
      .getSessionID()
      .then((res) => {
        if (res.success) {
          return res.guest_session_id;
        } else {
          throw new Error('Something went horribly wrong...');
        }
      })
      .then((result) => {
        console.log(result);

        this.setState(() => ({
          sessionID: result,
          isLoaded: true,
        }));
      })
      .catch((err) => {
        this.setState({
          isLoaded: true,
          error: true,
          errorMessage: err.message,
        });
      });
  }

  render() {
    const { isLoaded, error, errorMessage } = this.state;

    const spinerApp = !isLoaded ? <Spiner /> : null;
    const searchBar = isLoaded ? <SearchBar {...this.state} /> : null;
    const errorApp = error ? <ErrorMessage message={errorMessage} /> : null;

    return (
      <main className="app-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Search" key="1">
            {errorApp}
            {spinerApp}
            {searchBar}
          </TabPane>
          <TabPane tab="Rated" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </main>
    );
  }
}
