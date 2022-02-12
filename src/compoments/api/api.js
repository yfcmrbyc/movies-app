const URL =
  'https://api.themoviedb.org/3/search/movie?api_key=1e3339492be7d156ddfc2b662ae60dcf&language=ru-RU&query=return&page=1';

export default class MovieService {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}
                            , recrived ${res.status}`);
    }
    return res.json();
  }

  async getAllMovies() {
    const movies = await this.getResource(URL);
    return movies;
  }
}
