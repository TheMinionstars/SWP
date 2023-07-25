import React from 'react'
import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'

const { Content } = Layout

type LayoutProps = {
  children?: React.ReactNode
  activeLink: string
}
const UserLayout: React.FC<LayoutProps> = ({ children, activeLink }) => {
  return (
    <Layout className='!min-h-[100vh]'>
      <Header activeLink={activeLink} />
      <Content className='h-full'>{children}</Content>
      <Footer />
    </Layout>
  )
}

export default UserLayout
