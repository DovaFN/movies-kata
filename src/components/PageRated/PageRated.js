/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'

import MovieList from '../MovieList/MovieList'

export default class PageRated extends Component {
  componentDidMount() {
    const { getRatedMovies } = this.props
    getRatedMovies()
  }

  render() {
    const { data, error, loading, totalResults, getMovieRating, onChangeRating, guestSessionId } = this.props
    return (
      <div>
        <MovieList
          error={error}
          loading={loading}
          data={data}
          onChangeRating={onChangeRating}
          getMovieRating={getMovieRating}
          totalResults={totalResults}
          guestSessionId={guestSessionId}
        />
      </div>
    )
  }
}
