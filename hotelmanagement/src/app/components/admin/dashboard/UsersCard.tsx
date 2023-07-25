import { AccountDTO } from '@/app/data/account'
import { Card, Statistic } from 'antd'
import { Formatter } from 'antd/es/statistic/utils'
import React from 'react'
import CountUp from 'react-countup'
import { useNavigate } from 'react-router-dom'

const formatter: Formatter = (value) => <CountUp end={value as number} separator=',' />
const gridStyle: React.CSSProperties = { width: '25%', textAlign: 'center' }

type UsersCardProps = {
  loading: boolean
  data: AccountDTO[]
}

const UsersCard: React.FC<UsersCardProps> = ({ loading, data }) => {
  const navigate = useNavigate()

  const accountData = {
    total_users: data.length,
    customer_account: data.filter((account) => account.roleId === 3).length,
    staff_account: data.filter((account) => account.roleId === 2).length,
    admin_account: data.filter((account) => account.roleId === 1).length
  }

  return (
    <Card
      className='w-full cursor-pointer'
      onClick={() => navigate('/admin/users')}
      title='Users Information'
      loading={loading}
    >
      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-nowrap'
          title='Total Users'
          formatter={formatter}
          value={accountData.total_users}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-nowrap'
          title='Admin Role Users'
          formatter={formatter}
          value={accountData.admin_account}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-nowrap'
          title='Customer Role Users'
          formatter={formatter}
          value={accountData.customer_account}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-nowrap'
          title='Staff Role Users'
          formatter={formatter}
          value={accountData.staff_account}
        />
      </Card.Grid>
    </Card>
  )
}

export default UsersCard
