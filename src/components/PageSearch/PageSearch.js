/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'

import MovieList from '../MovieList/MovieList'
import SearchPanel from '../SearchPanel/SearchPanel'

export default class PageSearch extends Component {
  render() {
    const { guestSessionId, error, loading, data, totalResults, onSearching, getMovieRating, onChangeRating } =
      this.props
    return (
      <div>
        <SearchPanel onSearching={onSearching} />
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
