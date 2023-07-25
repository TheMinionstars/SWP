import React, { Suspense, useLayoutEffect, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Loading from './components/shared/Loading'
import ProtectedLayout from './components/route/ProtectedLayout'
import SpecificLayout from './components/route/SpecificLayout'
import PublicLayout from './components/route/PublicLayout'

const HomePage = lazy(() => import('@pages/HomePage'))
const LoginPage = lazy(() => import('@pages/LoginPage'))
// const ContactPage = lazy(() => import('@pages/ContactPage'))
const AdminPage = lazy(() => import('@pages/admin/AdminPage'))
const StaffPage = lazy(() => import('@pages/admin/StaffPage'))
const RoomsPage = lazy(() => import('@pages/RoomsPage'))
const RegisterPage = lazy(() => import('@pages/RegisterPage'))
const ProfilePage = lazy(() => import('@pages/ProfilePage'))
const BookingPage = lazy(() => import('@pages/BookingPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'))
const BlogsPage = lazy(() => import('@pages/BlogsPage'))
const ForgotPasswordPage = lazy(() => import('@pages/ForgotPasswordPage'))
const BlogPage = lazy(() => import('@pages/BlogPage'))

const Wrapper: React.FC<any> = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

const App: React.FC = () => {
  return (
    <Wrapper>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/contact' element={<ContactPage />} /> */}
          <Route path='/rooms' element={<RoomsPage />} />
          <Route path='/room/:slug/:id' element={<BookingPage />} />
          <Route path='/blogs' element={<BlogsPage />} />
          <Route path='/blog/:slug/:id' element={<BlogPage />} />
          <Route path='/me' element={<ProfilePage />} />

          <Route element={<ProtectedLayout />}>
            <Route element={<SpecificLayout allowed={['ROLE_Admin']} />}>
              <Route path='/admin/*' element={<AdminPage />} />
            </Route>
            <Route element={<SpecificLayout allowed={['ROLE_Staff']} />}>
              <Route path='/staff/*' element={<StaffPage />} />
            </Route>
          </Route>

          <Route element={<PublicLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Wrapper>
  )
}

export default App
