import React, { useEffect, useState } from 'react'
import UserBox from '@/app/components/shared/UserBox'
import {
  DashboardOutlined,
  FileProtectOutlined,
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
  ReadOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps } from 'antd'
const { Sider } = Layout
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks/reduxHooks'
import { logout } from '@/app/redux/slices/accountSlice'
type HeaderProps = {
  activeLink: string
}

const AdminSideBar: React.FC<HeaderProps> = ({ activeLink }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const itemMenus: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'Users'
    },
    {
      key: 'hotel-rooms',
      icon: <HomeOutlined />,
      label: 'Hotel Rooms'
    },
    {
      key: 'blogs',
      icon: <ReadOutlined />,
      label: 'Blogs'
    },
    {
      key: 'booking-rooms',
      icon: <FileProtectOutlined />,
      label: 'Booking Rooms'
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile'
    },
    {
      key: 'home',
      icon: <LogoutOutlined />,
      label: 'Back to Home'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout'
    }
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    if (e.key === 'logout') {
      dispatch(logout())
      navigate('/login')
    } else if (e.key === 'home') {
      navigate('/')
    } else {
      navigate('/admin/' + e.key)
    }
  }

  return (
    <Sider width={250} breakpoint='lg' collapsedWidth='0'>
      <UserBox />

      <Menu theme='dark' mode='inline' selectedKeys={[activeLink]} onClick={onClick} items={itemMenus} />
    </Sider>
  )
}

export default AdminSideBar
