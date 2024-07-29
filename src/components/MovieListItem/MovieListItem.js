import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import './MovieListItem.css'

import { Consumer } from '../MovieAppContext/MovieAppContext'
import MovieService from '../../services/moviesService'

export default class MovieListItem extends Component {
  _imageUrlBasic = 'https://image.tmdb.org/t/p/w500/'

  movieService = new MovieService()

  onChange = (value) => {
    const { id, guestSessionId, onChangeRating } = this.props

    onChangeRating(id, value)
    this.movieService.onSetRating(value, id, guestSessionId)
  }

  fitDescription = (text) => {
    const array = text.split('')
    const fitArr = []
    for (let i = 0; i < 130; i += 1) {
      fitArr.push(array[i])
    }
    const res = `${fitArr.slice(0, fitArr.lastIndexOf(' ')).join('')}...`
    return res
  }

  render() {
    const {
      title,
      release_date: releaseDate,
      overview,
      backdrop_path: backropPath,
      getMovieRating,
      id,
      genre_ids: genreIds,
    } = this.props

    const movie = {
      title,
      date: releaseDate ? format(new Date(Date.parse(releaseDate)), 'MMMM dd, yyyy') : releaseDate,
      imgSrc: backropPath ? this._imageUrlBasic + backropPath : null,
      overview: overview.length > 150 ? this.fitDescription(overview) : overview,
      rating: getMovieRating(id) || '0',
    }

    const { rating } = movie

    const circleColor = {
      borderColor:
        // eslint-disable-next-line no-nested-ternary
        rating < 3 ? '#E90000' : rating < 5 ? '#E97E00' : rating < 7 ? '#E9D100' : '#66E900',
    }

    let className = 'movieList-header'

    if (title.length > 35) {
      className = 'movieList-header fitted'
    }
    if (title.length > 40) {
      className = 'movieList-header fitted-more'
    }

    const content = (
      <Consumer>
        {(zhanres) => {
          let counter = 0
          const genreNames = genreIds.map((el) => {
            counter += 1
            const item = zhanres[el]
            return item
          })
          genreNames.length = 3
          const genreContent = genreNames.map((el) => (
            <button className="zhanre" type="button">
              {el}
            </button>
          ))
          return (
            <MovieView
              genreContent={genreContent}
              style={circleColor}
              className={className}
              movie={movie}
              onChange={this.onChange}
            />
          )
        }}
      </Consumer>
    )
    return <li className="movieList-item">{content}</li>
  }
}

function MovieView({ movie, onChange, className, style, genreContent }) {
  const { title, date, imgSrc, overview, rating, genre_ids: genreIds } = movie
  return (
    <>
      <img className="movieList-image" src={imgSrc} alt="" />
      <div className="movieList-container">
        <h1 className={className}>{title}</h1>
        <div style={style} className="movieList-wrapper">
          <span className="movieList-rating">{rating}</span>
        </div>
        <div className="movieList-date">{date}</div>
        <label>{genreContent}</label>
        <p className="movieList-description">{overview}</p>
        <Rate className="movieList-rate" onChange={onChange} allowHalf count={10} defaultValue={rating} />
      </div>
    </>
  )
}
