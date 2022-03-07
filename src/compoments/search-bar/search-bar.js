import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './search-bar.css';

export default class SearchBar extends Component {
  static propTypes = {
    searchMovies: PropTypes.func.isRequired,
  };

  state = {
    label: '',
  };

  onLabelChange = (event) => {
    const { searchMovies } = this.props;

    if (event.target.value.length > 0) {
      searchMovies(event.target.value);
    } else {
      searchMovies('return');
    }

    this.setState(() => ({
      label: event.target.value,
    }));
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState(() => ({
      label: '',
    }));
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          placeholder="Type to search..."
          className="search-bar"
          type="search"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    );
  }
}
