import React, { Component } from 'react'
import { Online, Offline } from 'react-detect-offline'

import './App.css'
import MovieList from '../MovieList/MovieList'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import SearchPanel from '../SearchPanel/SearchPanel'
import MovieService from '../../services/moviesService'
import Paginator from '../Paginator/Paginator'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    searchValue: null,
    data: [],
    loading: true,
    error: false,
    current: 1,
    totalPages: null,
    totalResults: null,
  }

  componentDidMount() {
    this.searchMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, current } = this.state
    if (searchValue !== prevState.searchValue || current !== prevState.current) {
      this.searchMovies()
    }
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  searchMovies = () => {
    const { searchValue, current } = this.state
    this.setState({ loading: true })
    this.movieService
      .getMovies(searchValue, current)
      .then((res) => {
        const { results, page, total_pages: totalPages, total_results: totalResults } = res
        this.setState(() => ({
          data: results.slice(),
          current: page,
          totalPages,
          totalResults,
          loading: false,
        }))
      })
      .catch(this.onError)
  }

  onSearching = (value) => {
    this.setState({ searchValue: value, current: 1 })
  }

  onChangingPage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const { data, error, loading, current, totalPages, totalResults } = this.state
    return (
      <main className="container">
        <Online>
          <SearchPanel onSearching={this.onSearching} />
          <MovieList error={error} loading={loading} data={data} totalResults={totalResults} />
          <Paginator onChanging={this.onChangingPage} current={current} totalPages={totalPages} />
        </Online>
        <Offline>
          <ErrorAlert
            type="error"
            message="Whoops!"
            description="You dont have internet, check your connection and try again"
          />
        </Offline>
      </main>
    )
  }
}
