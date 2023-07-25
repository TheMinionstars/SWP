import React from 'react'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button, Layout, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import useFullScreen from '@/app/hooks/useFullScreen'

const { Header } = Layout
const AdminHeader: React.FC = () => {
  const { isFullscreen, toggleFullScreen } = useFullScreen()
  return (
    <Header className='p-0 !bg-bg-white'>
      <Link to='../dashboard'>
        <img className='w-[280px] h-[65px] mx-auto' alt='beach-resort-logo' src='/logo.svg' />
      </Link>

      {/* full screen toggle button */}
      <Tooltip title='Click to toggle Full Screen' placement='left'>
        <Button
          className='absolute right-5 top-5'
          icon={isFullscreen ? <FullscreenExitOutlined className='pb-12' /> : <FullscreenOutlined className='pb-12' />}
          onClick={toggleFullScreen}
          shape='default'
          type='default'
          size='middle'
        />
      </Tooltip>
    </Header>
  )
}

export default AdminHeader
