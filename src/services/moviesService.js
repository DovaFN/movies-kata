export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'

  _apiKey = '364ab4cbb95bbd30ff476dabe40df3a7'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjRhYjRjYmI5NWJiZDMwZmY0NzZkYWJlNDBkZjNhNyIsIm5iZiI6MTcyMjA3Mjg4Mi41MzA2OTgsInN1YiI6IjY2OGQ2ZWM5NWY0MjI0YzY3YTJjMmE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LoiEfQTuPbv835y1KlfrpoFXXrni3-Hc-19OUkHY1qM',
    },
  }

  async startGuestSession() {
    const response = await fetch(`${this._apiBase}/authentication/guest_session/new`, this.options)
    if (!response.ok) {
      throw new Error(`Could not start guest session, received ${response.status}`)
    }
    const res = await response.json()
    return res.guest_session_id
  }

  async getRatedMovies(guestSessionId, page) {
    const url = `${this._apiBase}/guest_session/${guestSessionId}/rated/movies?&language=en-US&page=${page}&sort_by=created_at.asc`
    const response = await fetch(url, this.options)
    if (!response.ok) {
      throw new Error(`Could not get Rated Movies by session ${guestSessionId}, received ${response.status}`)
    }
    const res = await response.json()
    return res
  }

  async findMoviesByKeyword(keyword, page) {
    const url = `${this._apiBase}/search/movie?&query=${keyword}&page=${page}`
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

  async getZhanres() {
    const zhanres = await fetch(`${this._apiBase}/genre/movie/list?language=en`, this.options)
    const res = await zhanres.json()
    const result = res.genres.reduce((acc, dec) => {
      acc[dec.id] = dec.name
      return acc
    }, {})
    return result
  }

  async onSetRating(number, id, guestSessionId) {
    const obj = { value: number }
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjRhYjRjYmI5NWJiZDMwZmY0NzZkYWJlNDBkZjNhNyIsIm5iZiI6MTcyMjA3Mjg4Mi41MzA2OTgsInN1YiI6IjY2OGQ2ZWM5NWY0MjI0YzY3YTJjMmE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LoiEfQTuPbv835y1KlfrpoFXXrni3-Hc-19OUkHY1qM',
      },
      body: JSON.stringify(obj),
    }

    const res = await fetch(`${this._apiBase}/movie/${id}/rating?&guest_session_id=${guestSessionId}`, options)
  }
}
