import React from 'react'
import { Online, Offline } from 'react-detect-offline'

import './App.css'
import MovieList from '../MovieList/MovieList'
import ErrorAlert from '../ErrorAlert/ErrorAlert'

function App() {
  return (
    <main className="container">
      <Online>
        <MovieList />
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

export default App
