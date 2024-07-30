import React, { Children, Component } from 'react'
import { Tabs } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import './App.css'
import MovieService from '../../services/moviesService'
import PageSearch from '../PageSearch/PageSearch'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import { Provider, Consumer } from '../MovieAppContext/MovieAppContext'
import PageRated from '../PageRated/PageRated'
import Paginator from '../Paginator/Paginator'

export default class App extends Component {
  state = {
    guestSessionId: null,
    searching: true,
    searchValue: null,
    data: [],
    rating: {},
    loading: false,
    error: false,
    zhanres: [],
    current: 1,
    totalPages: null,
    totalResults: null,
  }

  movieService = new MovieService()

  componentDidMount() {
    this.movieService
      .startGuestSession()
      .then((value) =>
        this.setState({
          guestSessionId: value,
        })
      )
      .then(() => this.movieService.getZhanres())
      .then((result) => {
        this.setState({
          zhanres: result,
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, current, searching } = this.state
    if (!searching && current !== prevState.current) {
      this.getRatedMovies()
    }
    if (searchValue !== prevState.searchValue || current !== prevState.current) {
      this.searchMovies()
    }
  }

  onChangeRating = (id, value) => {
    const { rating } = this.state
    const newRated = JSON.parse(JSON.stringify(rating))
    newRated[id] = value
    this.setState({
      rating: newRated,
    })
  }

  getRatedMovies = () => {
    const { current, guestSessionId } = this.state
    this.movieService
      .getRatedMovies(guestSessionId, current)
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

  getMovieRating = (id) => {
    const { rating } = this.state
    return rating[id]
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

  onChange = (e) => {
    this.setState({
      searching: e === '1',
    })
  }

  render() {
    const { guestSessionId, searching, data, error, loading, current, totalPages, totalResults, zhanres } = this.state
    const items = [
      {
        key: '1',
        label: 'Search',
      },
      {
        key: '2',
        label: 'Rated',
      },
    ]
    const page = searching ? (
      <PageSearch
        error={error}
        loading={loading}
        data={data}
        onChangeRating={this.onChangeRating}
        getMovieRating={this.getMovieRating}
        totalResults={totalResults}
        onSearching={this.onSearching}
        guestSessionId={guestSessionId}
      />
    ) : (
      <PageRated
        error={error}
        loading={loading}
        data={data}
        onChangeRating={this.onChangeRating}
        getMovieRating={this.getMovieRating}
        getRatedMovies={this.getRatedMovies}
        totalResults={totalResults}
        guestSessionId={guestSessionId}
      />
    )
    return (
      <main className="container">
        <Online>
          <Provider value={zhanres}>
            <Tabs indicator={{ size: 73 }} centered className="tabs" items={items} onChange={this.onChange} />
            {page}
            <Paginator onChanging={this.onChangingPage} current={current} totalPages={totalPages} />
          </Provider>
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
