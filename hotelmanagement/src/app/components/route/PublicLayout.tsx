import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../hooks/reduxHooks'

const PublicLayout: React.FC = () => {
  const { isLogin, userInfo } = useAppSelector((state: RootState) => state.account)
  if (isLogin) {
    if (userInfo?.role === 'ROLE_Admin') {
      return <Navigate to='/admin/dashboard' />
    } else if (userInfo?.role === 'ROLE_Staff') {
      return <Navigate to='/staff/dashboard' />
    }
    return <Navigate to='/' />
  }
  return <Outlet />
}

export default PublicLayout
