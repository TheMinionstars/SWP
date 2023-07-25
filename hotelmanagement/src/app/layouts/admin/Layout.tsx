import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button, Layout, Tooltip } from 'antd'
import AdminSideBar from './SideBar'
import React from 'react'
import AdminHeader from './Header'
import AdminFooter from './Footer'

const { Header, Content, Footer } = Layout
type LayoutProps = {
  children?: React.ReactNode
  activeLink: string
}
const AdminLayout: React.FC<LayoutProps> = ({ children, activeLink }) => {
  return (
    <Layout className='!min-h-[100vh]'>
      <AdminSideBar activeLink={activeLink} />
      <Layout className='!min-h-[100vh]'>
        <AdminHeader />
        <Content className='bg-bg-white overflow-y-scroll m-2 p-2 h-full'>{children}</Content>
        <AdminFooter />
      </Layout>
    </Layout>
  )
}

export default AdminLayout
