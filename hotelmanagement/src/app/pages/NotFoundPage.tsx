import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC<{ backTo?: string }> = ({ backTo }) => (
  <Result
    status='404'
    title='404'
    subTitle='Sorry, the page you visited does not exist.'
    extra={
      <Link to={backTo ? backTo : '/'}>
        <Button type='primary'>Back Home</Button>
      </Link>
    }
  />
)

export default NotFoundPage
