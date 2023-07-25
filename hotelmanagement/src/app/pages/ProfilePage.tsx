import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import UserLayout from '@layouts/user/Layout'
import { HistoryOutlined, UserOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import MyProfile from '../components/customer/profile/MyProfile'
import BookingHistory from '../components/customer/profile/BookingHistory'
const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1')
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    if (searchParams.get('tab') === 'my-profile') {
      setActiveTab('1')
    } else if (searchParams.get('tab') === 'booking-history') {
      setActiveTab('2')
    } else {
      setActiveTab('1')
    }
  }, [searchParams])

  const handleTabClick = (key: string) => {
    if (key === '1') {
      navigate('/me?tab=my-profile')
    } else if (key === '2') {
      navigate('/me?tab=booking-history')
    } else {
      navigate('/me')
    }
  }

  return (
    <UserLayout activeLink='profile'>
      <div className='!profile-container '>
        <Tabs
          className='h-full'
          tabPosition='left'
          activeKey={activeTab}
          onTabClick={handleTabClick}
          size='large'
          type='line'
          items={[
            {
              key: '1',
              label: (
                <span>
                  <UserOutlined /> My Profile
                </span>
              ),
              children: <MyProfile />
            },
            {
              key: '2',
              label: (
                <span>
                  <HistoryOutlined /> Booking History
                </span>
              ),
              children: <BookingHistory />
            }
          ]}
        />
      </div>
    </UserLayout>
  )
}

const Index = React.memo(ProfilePage)
export default Index
