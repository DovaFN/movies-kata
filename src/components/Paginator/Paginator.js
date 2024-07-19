import React, { Component } from 'react'
import { Pagination } from 'antd'

export default class Paginator extends Component {
  state = {
    defaultCurrent: 1,
  }

  onChange = (page) => {
    const { onChanging } = this.props
    onChanging(page)
  }

  render() {
    const { totalPages: total, current } = this.props
    const { defaultCurrent } = this.state
    return (
      <Pagination
        showSizeChanger={false}
        onChange={this.onChange}
        align="center"
        current={current}
        defaultCurrent={defaultCurrent}
        total={total * 10}
      />
    )
  }
}
