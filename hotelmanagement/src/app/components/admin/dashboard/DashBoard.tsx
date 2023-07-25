import { Result } from 'antd'
import React from 'react'
import useFetchData from '../../../hooks/useFetchData'
import AdminLayout from '@/app/layouts/admin/Layout'
import UsersCard from './UsersCard'
import { AccountDTO } from '@/app/data/account'

const Dashboard: React.FC = () => {
  // fetch dashboard API data
  const [loading, error, response] = useFetchData('/accounts')

  const account: AccountDTO[] = response ? response : []
  return (
    <AdminLayout activeLink='dashboard'>
      <div>
        <h2 className='text-[20px] text-center font-text-font font-medium py-4'>Welcome to FPT Hotel — Dashboard</h2>

        {error ? (
          <Result title='Failed to fetch' subTitle={error} status='error' />
        ) : (
          <UsersCard loading={loading} data={account} />
        )}
      </div>
    </AdminLayout>
  )
}

const Index = React.memo(Dashboard)
export default Index
