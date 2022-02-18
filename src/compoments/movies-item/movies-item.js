import React, { Component } from 'react';
import { Image, Tag, Rate } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import imgURL from './NoImageFound.jpg';
import './movies-item.css';
import MovieService from '../api/api';

export default class MoviesItem extends Component {
  movieService = new MovieService();

  static defaultProps = {
    poster_path: null,
  };

  static propTypes = {
    movie: PropTypes.shape.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    sessionID: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    valueRate: null,
    isRated: false,
  };

  componentDidUpdate(prevState) {
    const {
      movie: { id },
      sessionID,
    } = this.props;

    if (this.state.valueRate !== prevState.valueRate) {
      this.movieService.postRateMovie(id, sessionID, this.state.valueRate).then();
    }
  }

  renderRateCount = () => {
    const { valueRate: value } = this.state;
    const rateClassName = classNames('rating', {
      'low-rating': value < 3,
      'average-rating': value > 3 && value < 5,
      'above-average-rating': value > 5 && value < 7,
      'high-rating': value > 7,
    });

    return <span className={rateClassName}>{value.toString()}</span>;
  };

  renderGenres = (genres, ids) => {
    const tags = [];

    ids.forEach((id) => {
      genres.forEach((item) => {
        if (item.id === id) {
          tags.push(<Tag>{item.name}</Tag>);
        }
      });
    });

    return tags;
  };

  onRateChange = (value) => {
    this.setState(() => ({
      valueRate: value,
      isRated: true,
    }));
  };

  textCropping(text) {
    if (text.length > 210) {
      const array = text.split('');
      const limit = array.slice(0, 210).lastIndexOf(' ');

      return array.slice(0, limit).concat(' ...').join('');
    }
    return text;
  }

  render() {
    console.log(this.props);

    const { movie, genres } = this.props;
    const { poster_path: path, overview, release_date: releaseDate, title, genre_ids: genreIds } = movie;

    const url = path ? `https://image.tmdb.org/t/p/w780/${path}` : imgURL;
    const date = releaseDate.length > 0 ? format(new Date(releaseDate), 'MMMM d, yyyy') : 'Release date unknown';
    const rateCount = this.state.isRated ? this.renderRateCount() : null;
    const genre = genreIds.length > 0 ? this.renderGenres(genres, genreIds) : null;

    return (
      <>
        <Image className="movies-image" src={url} alt={title} />
        <article className="movies-card__container">
          <header>
            <div className="title-container">
              <h3 className="title">{title}</h3>
              <span className="subtitle">{date}</span>
            </div>
            {rateCount}
          </header>
          <ul className="all-tags">{genre}</ul>
          <p>{this.textCropping(overview)}</p>
          <Rate allowHalf defaultValue={0} count="10" onChange={this.onRateChange} />
        </article>
      </>
    );
  }
}
