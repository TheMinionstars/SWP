import React from 'react'
import UserLayout from '@layouts/user/Layout'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import BookingContainer from '../components/customer/booking/BookingContainer'

const BookingPage: React.FC = () => {
  return (
    <UserLayout activeLink='booking'>
      <div className='xl:px-16 mx-auto sm:px-8 min-h-[500px] bg-[#fff]'>
        <div className=' pt-6 sm:pt-16 w-full'>
          <div className='px-5 sm:px-10 lg:px-0 space-y-5'>
            <Link to='/rooms'>
              <Button type='primary'>Back to rooms</Button>
            </Link>
            <BookingContainer />
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
const Index = React.memo(BookingPage)
export default Index
