export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjRhYjRjYmI5NWJiZDMwZmY0NzZkYWJlNDBkZjNhNyIsIm5iZiI6MTcyMDcxNjEyMC43MTM5NDQsInN1YiI6IjY2OGQ2ZWM5NWY0MjI0YzY3YTJjMmE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.alBqQvMw-2rxa0qfP_0LfzjhevQFyKPYP89e4ryRSoM',
    },
  }

  async findMoviesByKeyword(keyword, page) {
    const url = `${this._apiBase}/search/movie?query=${keyword}&page=${page}`
    const response = await fetch(url, this.options)
    if (response.ok) {
      const res = await response.json()
      return res
    }
    throw new Error(`Could not fetch ${url}, received ${response.status}`)
  }

  async getMovies(keyword, page) {
    const movies = await this.findMoviesByKeyword(keyword, page)
    return movies
  }
}
