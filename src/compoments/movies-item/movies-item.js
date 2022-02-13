import React from 'react';
import { Image, PageHeader, Tag, Rate } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import './movies-item.css';

function textCropping(text) {

  if (text.length > 175) {
    const array = text.split('');
    const limit = array.slice(0, 175).lastIndexOf(' ');
    return array.slice(0, limit).concat(' ...').join('');
  } 
  return text;
}

function MoviesItem({ vote_average: rate, poster_path: path, overview, release_date: releaseDate, title }) {
  return (
    <li className="movies-card">
      <Image 
        className="movies-image" 
        src={`https://image.tmdb.org/t/p/w780/${path}`} 
        alt={title} 
      />
      <article className="movies-card__container">
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={format(new Date(releaseDate), 'MMMM d, yyyy')}
          extra={rate.toString()}
        />
        <ul className="all-tags">
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </ul>
        <p>{textCropping(overview)}</p>
        <Rate disabled allowHalf defaultValue={2.5} count="10" style={{ width: 240 }} />
      </article>
    </li>
  );
}

MoviesItem.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
};
export default MoviesItem;
