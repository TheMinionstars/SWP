/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Space, Menu, Button, Layout, Dropdown, Avatar, Grid } from 'antd'
import type { MenuProps } from 'antd'
import { CloudOutlined, UserOutlined, VideoCameraOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks'
import { logout } from '@/app/redux/slices/accountSlice'
import type { RootState } from '@redux/store'

type HeaderProps = {
  activeLink: string
}

const { Header } = Layout
const { useBreakpoint } = Grid
const DropdownItem: React.FC<{ to: string; text: string }> = ({ to, text }) => {
  return (
    <Link to={to} style={{ padding: '16px' }}>
      {text}
    </Link>
  )
}

const UserHeader: React.FC<HeaderProps> = ({ activeLink }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const screens = useBreakpoint()

  const { isLogin, userInfo } = useAppSelector((state: RootState) => state.account)
  const itemMenus: MenuProps['items'] = [
    {
      key: 'home',
      icon: <UserOutlined />,
      label: `Home`
    },
    {
      key: 'rooms',
      icon: <CloudOutlined />,
      label: `Rooms`
    },
    {
      key: 'blogs',
      icon: <CloudOutlined />,
      label: `Blogs`
    }
  ]

  const itemDropdowns: MenuProps['items'] = [
    {
      label: <DropdownItem to='/me' text='Thông tin cá nhân' />,
      key: 'me'
    },
    userInfo?.role === 'ROLE_Admin'
      ? {
          label: <DropdownItem to='/admin/dashboard' text='Dashboard' />,
          key: 'admin-dashboard'
        }
      : userInfo?.role === 'ROLE_Staff'
      ? {
          label: <DropdownItem to='/staff/dashboard' text='Dashboard' />,
          key: 'staff-dashboard'
        }
      : null,

    {
      label: (
        <a
          className='p-[16px]'
          onClick={() => {
            dispatch(logout())
            navigate('/login')
          }}
        >
          Logout
        </a>
      ),
      key: 'logout'
    }
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    if (e.key === 'home') {
      navigate('/')
    } else {
      navigate('/' + e.key)
    }
  }
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className='w-full flex justify-between items-center px-10'>
        <Space size='large'>
          <Link to='/' className={`hidden md:block`}>
            <img src='/Logo1.png' alt='Reach Resort' className={`h-8 w-auto `} />
          </Link>
          <Menu
            disabledOverflow={screens.sm ? true : false}
            onClick={onClick}
            theme='dark'
            mode='horizontal'
            selectedKeys={[activeLink]}
            items={itemMenus}
          />
        </Space>

        <Space>
          {!isLogin ? (
            <>
              <Button type='primary' onClick={() => navigate('/login')}>
                Login
              </Button>

              <Button type='primary' onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          ) : (
            <>
              <Dropdown menu={{ items: itemDropdowns }} placement='bottomRight' trigger={['click']}>
                {/* <Button type='primary'>bottomRight</Button> */}
                <Avatar size='large' src='/default.jpg' className='cursor-pointer' />
              </Dropdown>
            </>
          )}
        </Space>
      </div>
    </Header>
  )
}

export default UserHeader
