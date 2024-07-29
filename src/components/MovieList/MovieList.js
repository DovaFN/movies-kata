import React, { Component } from 'react'

import ErrorAlert from '../ErrorAlert/ErrorAlert'
import MovieListItem from '../MovieListItem/MovieListItem'
import Spinner from '../Spinner/Spinner'

import './MovieList.css'

export default class MovieList extends Component {
  render() {
    const { data, loading, error, totalResults, guestSessionId, getMovieRating, onChangeRating } = this.props

    const moviesArr = data.map((el) => {
      const { id, ...itemProps } = el
      return (
        <MovieListItem
          key={id}
          id={id}
          guestSessionId={guestSessionId}
          getMovieRating={getMovieRating}
          onChangeRating={onChangeRating}
          {...itemProps}
        />
      )
    })
    const getContent = () => {
      if (loading) {
        return <Spinner />
      }
      if (error) {
        return <ErrorAlert message="Whoops!" description="We have some problem with server" />
      }
      if (totalResults) {
        return moviesArr
      }
      return <ErrorAlert message="Whoops!" description="We find nothing" />
    }

    const content = getContent()

    return <ul className="movieList">{content}</ul>
  }
}
