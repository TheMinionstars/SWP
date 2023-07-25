import React from 'react'
import UserLayout from '@layouts/user/Layout'
import RoomContainer from '../components/customer/room/RoomContainer'
import { Link } from 'react-router-dom'
import Banner from '../components/customer/home/Banner'
import Hero from '../components/customer/home/Hero'
import { Button } from 'antd'

const RoomsPage: React.FC = () => {
  return (
    <UserLayout activeLink='rooms'>
      <Hero hero='roomsHero'>
        <Banner title='our rooms'>
          <Link to='/'>
            <Button className='capitalize' type='primary'>
              return home
            </Button>
          </Link>
        </Banner>
      </Hero>
      <div className='w-full bg-[#F7FAFC] p-[32px]'>
        <div className='max-w-[1180px] flex m-[0_auto] justify-between items-center'>
          <h2 className='text-[20px] font-[600]'>Chọn phòng</h2>
        </div>
        <div className='m-[0_auto] max-w-[1180px] space-y-10'>
          <RoomContainer />
        </div>
      </div>
    </UserLayout>
  )
}

export default RoomsPage
