import { Routes, Route } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import NotFoundPage from '../NotFoundPage'
import Loading from '@/app/components/shared/Loading'

const DashBoard = lazy(() => import('@/app/components/admin/dashboard/DashBoard'))
const Users = lazy(() => import('@/app/components/admin/users/Users'))
const Rooms = lazy(() => import('@/app/components/admin/rooms/Rooms'))
const Blogs = lazy(() => import('@/app/components/admin/blogs/Blogs'))
const MyProfile = lazy(() => import('@/app/components/admin/profile/MyProfile'))
const BookingRooms = lazy(() => import('@/app/components/admin/booking-rooms/BookingRooms'))

const AdminPage: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/hotel-rooms' element={<Rooms />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/booking-rooms' element={<BookingRooms />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='*' element={<NotFoundPage backTo='/admin/dashboard' />} />
      </Routes>
    </Suspense>
  )
}

export default AdminPage
