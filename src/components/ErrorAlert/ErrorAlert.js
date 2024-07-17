import React from 'react'
import { Alert } from 'antd'

function ErrorAlert({ message, description }) {
  return <Alert message={message} description={description} type="error" />
}

export default ErrorAlert
