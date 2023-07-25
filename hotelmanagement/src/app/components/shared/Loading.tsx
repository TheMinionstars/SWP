import { Layout, Spin } from 'antd'
import React from 'react'

const { Content } = Layout

const Loading: React.FC = () => {
  return (
    <Content className='loading'>
      <Spin size='large' tip='Loading...' />
    </Content>
  )
}

export default Loading
