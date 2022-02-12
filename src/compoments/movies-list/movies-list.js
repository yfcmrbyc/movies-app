import React, { Component } from 'react';

import MovieService from '../api/api';
import MoviesItem from '../movies-item/movies-item';
import './movies-list.css';

export default class MoviesList extends Component {
    movieService = new MovieService;

    state = {
        error: null,
        isLoaded: false,
        movies: []
    }

    componentDidMount() {
        this.movieService.getAllMovies()
            .then(result => {
                this.setState({
                    isLoaded: true,
                    movies: result.results
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
    }

    render() {
        const { isLoaded, error, movies } = this.state;

        if (error) {
            return (<p>Error: {error.message}</p>);
        } else if (!isLoaded) {
            return (<p> Loading . . .</p>);
        } else {
            return (
                <ul>
                    {
                        movies.map(movie => (
                                <li key={movie.id}>
                                    <MoviesItem 
                                        name={movie.title} 
                                        imgUrl={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} 
                                        overview={movie.overview} 
                                        releaseDate={new Date(movie.release_date)} 
                                        rate={movie.vote_average} 
                                    />
                                </li>))
                    }
                </ul>
            );
        }
    }
}