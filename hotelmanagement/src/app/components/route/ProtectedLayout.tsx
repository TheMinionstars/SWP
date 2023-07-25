import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../hooks/reduxHooks'

const ProtectedLayout: React.FC = () => {
  const { isLogin } = useAppSelector((state: RootState) => state.account)
  return isLogin ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedLayout
