import React, { Component } from 'react'
import './MovieListItem.css'
import { format } from 'date-fns'

export default class MovieListItem extends Component {
  _imageUrlBasic = 'https://image.tmdb.org/t/p/w200/'

  fitDescription(text) {
    const array = text.split('')
    const fitArr = []
    for (let i = 0; i < 170; i += 1) {
      fitArr.push(array[i])
    }
    const res = `${fitArr.slice(0, fitArr.lastIndexOf(' ')).join('')}...`
    return res
  }

  render() {
    const { title, release_date: releaseDate, overview, backdrop_path: backropPath } = this.props
    const movie = {
      title,
      date: releaseDate ? format(new Date(Date.parse(releaseDate)), 'MMMM dd, yyyy') : releaseDate,
      imgSrc: backropPath ? this._imageUrlBasic + backropPath : null,
      overview: overview.length > 170 ? this.fitDescription(overview) : overview,
    }

    const content = <MovieView movie={movie} />
    return <li className="movieList-item">{content}</li>
  }
}

function MovieView({ movie }) {
  const { title, date, imgSrc, overview } = movie
  return (
    <>
      <img className="movieList-image" src={imgSrc} alt="" />
      <div className="movieList-container">
        <h1 className="movieList-header">{title}</h1>
        <div className="movieList-date">{date}</div>
        <label>
          <button type="button" className="zhanre">
            #
          </button>
          <button type="button" className="zhanre">
            #
          </button>
        </label>
        <p className="movieList-description">{overview}</p>
      </div>
    </>
  )
}
