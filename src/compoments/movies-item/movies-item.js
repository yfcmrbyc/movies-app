import React, { Component } from 'react';
import { Image, Tag, Rate } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import imgURL from './NoImageFound.jpg';
import './movies-item.css';
import { GenresConsumer } from '../genres-context/genres-context';

export default class MoviesItem extends Component {
  static propTypes = {
    movie: PropTypes.objectOf(PropTypes.any).isRequired,
    rateMovie: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
  };

  state = {
    rating: null,
  };

  renderRateCount = (value) => {
    const rateClassName = classNames('rating', {
      'low-rating': value < 3,
      'average-rating': value >= 3 && value <= 5,
      'above-average-rating': value > 5 && value <= 7,
      'high-rating': value > 7,
    });

    return <span className={rateClassName}>{value.toString()}</span>;
  };

  renderGenres = (genres, ids) => {
    const tags = [];

    genres.forEach((genre) => {
      ids.forEach((id) => {
        if (id === genre.id) {
          tags.push(<Tag key={id}>{genre.name}</Tag>);
        }
      });
    });

    return tags;
  };

  onRateChange = (value) => {
    const {
      movie: { id },
    } = this.props;

    this.props.rateMovie(id, value);
    this.setState(() => ({
      rating: value,
    }));
  };

  textCropping(text) {
    if (text.length > 150) {
      const array = text.split('');
      const limit = array.slice(0, 150).lastIndexOf(' ');

      return array.slice(0, limit).concat(' ...').join('');
    }
    return text;
  }

  render() {
    const { movie, tab } = this.props;
    const { poster_path: path, overview, release_date: releaseDate, title, genre_ids: genresIds, rating } = movie;

    const url = path ? `https://image.tmdb.org/t/p/w780/${path}` : imgURL;
    const date = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : 'Release date unknown';
    const propsRating = rating > 0 ? this.renderRateCount(Number(rating)) : null;
    const rateCount = this.state.rating && tab === 'rated' ? this.renderRateCount(this.state.rating) : propsRating;

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
          <GenresConsumer>
            {(genres) => <ul className="all-tags">{this.renderGenres(genres, genresIds)}</ul>}
          </GenresConsumer>
          <p>{this.textCropping(overview)}</p>
          <Rate allowHalf defaultValue={rating} count="10" onChange={this.onRateChange} />
        </article>
      </>
    );
  }
}
