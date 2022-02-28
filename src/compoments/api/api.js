export default class MovieService {
  apiKey = `api_key=1e3339492be7d156ddfc2b662ae60dcf`;

  URL = `https://api.themoviedb.org/3/search/movie?${this.apiKey}`;

  genresURL = `https://api.themoviedb.org/3/genre/movie/list?${this.apiKey}&language=en-US`;

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}
                            , recrived ${res.status}`);
    }
    return res.json();
  }

  async getAllMovies(value, pageNumber = 1) {
    const movies = await this.getResource(`${this.URL}&query=${value}&page=${pageNumber}`);
    return movies;
  }

  async getGenres() {
    const genres = await this.getResource(this.genresURL);
    return genres;
  }
}
