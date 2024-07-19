import React, { Component } from 'react'
import './SearchPanel.css'
import debounce from 'lodash.debounce'

export default class SearchPanel extends Component {
  state = {
    value: '',
  }

  debounceSearching = debounce((value) => {
    const { onSearching } = this.props
    onSearching(value)
    this.setState({
      value: '',
    })
  }, 1000)

  onChanging = (e) => {
    this.setState({
      value: e.target.value,
    })

    this.debounceSearching(e.target.value)
  }

  render() {
    const { value } = this.state
    return <input className="searchPanel-input" type="text" onChange={this.onChanging} value={value} />
  }
}
