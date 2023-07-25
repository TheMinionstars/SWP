import { Result, Button } from 'antd'
import React from 'react'
interface ErrorProps {
  error?: string
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => (
  <Result status='403' title='403' subTitle={error ? error : 'Sorry, you are not authorized to access this page.'} />
)

export default ErrorPage
