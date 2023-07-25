import { Routes, Route } from 'react-router-dom'
import NotFoundPage from '../NotFoundPage'
import BookingRooms from '@/app/components/admin/booking-rooms/BookingRooms'
const StaffPage: React.FC = () => {
  return (
    <Routes>
      <Route path='/booking-rooms' element={<BookingRooms />} />
      <Route path='*' element={<NotFoundPage backTo='/admin/dashboard' />} />
    </Routes>
  )
}

export default StaffPage
