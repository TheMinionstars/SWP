import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../hooks/reduxHooks'
import ErrorPage from '@/app/pages/ErrorPage'
import { Role } from '@/app/data/other'

interface SpecificProps {
  allowed: Role[]
}

const SpecificLayout: React.FC<SpecificProps> = ({ allowed }) => {
  const { isLogin, userInfo } = useAppSelector((state: RootState) => state.account)
  if (isLogin) {
    if (allowed.includes('ALL')) {
      return <Outlet />
    }
    if (allowed.includes(userInfo?.role as Role)) {
      return <Outlet />
    } else {
      return <ErrorPage />
    }
  }
  return <Outlet />
}

export default SpecificLayout
