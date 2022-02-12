import React from 'react';
import { Image, PageHeader, Tag, Rate } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import './movies-item.css';

function textCropping(text) {
  if (text.length < 150) {
    return text;
  } else {
    const limit = text.split('').slice(0, 145).lastIndexOf(' ');
    return text.split('').slice(0, limit).concat(' ...').join('');
  }
}

function MoviesItem({ name, imgUrl, overview, releaseDate, rate }) {
  return (
    <div className="movies-card">
      <Image className="movies-image" src={`https://image.tmdb.org/t/p/w780/${imgUrl}`} alt={name} />
      <article className="movies-card__container">
        <PageHeader
          className="site-page-header"
          title={name}
          subTitle={format(releaseDate, 'MMMM d, yyyy')}
          extra={rate}
        />
        <ul className="all-tags">
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </ul>
        <p>{textCropping(overview)}</p>
        <Rate disabled allowHalf defaultValue={2.5} count="10" style={{ width: 240 }} />
      </article>
    </div>
  );
}

MoviesItem.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.instanceOf(Date).isRequired,
  rate: PropTypes.number.isRequired,
};
export default MoviesItem;
