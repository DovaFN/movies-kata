import React, { Component } from 'react'

import ErrorAlert from '../ErrorAlert/ErrorAlert'
import MovieService from '../../services/moviesService'
import MovieListItem from '../MovieListItem/MovieListItem'
import Spinner from '../Spinner/Spinner'

import './MovieList.css'

export default class MovieList extends Component {
  movieService = new MovieService()

  state = {
    data: [],
    loading: true,
    error: false,
  }

  constructor() {
    super()
    this.searchMovies()
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  searchMovies() {
    this.movieService
      .getMovies()
      .then((res) =>
        this.setState(() => ({
          data: res,
          loading: false,
        }))
      )
      .catch(this.onError)
  }

  render() {
    const { data, loading, error } = this.state

    const moviesArr = data.map((el) => {
      const { id, ...itemProps } = el
      return <MovieListItem key={id} {...itemProps} />
    })
    const content = loading ? <Spinner /> : moviesArr
    const err = error ? <ErrorAlert message="Whoops!" description="We have some problem with server" /> : null
    return (
      <ul className="movieList">
        {err} {content}
      </ul>
    )
  }
}
