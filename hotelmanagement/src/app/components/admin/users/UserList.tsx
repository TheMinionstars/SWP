import { Button, Pagination, Result, Table, TableProps, Tag, App, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import useFetchData from '@/app/hooks/useFetchData'
import { AccountDTO } from '@/app/data/account'
import { userRoleIdAsResponse } from '@/app/utils/responseAsStatus'
import axiosClient from '@/app/utils/api/axiosClient'
import { useAppDispatch } from '@/app/hooks/reduxHooks'
import { reFetchData } from '@/app/redux/slices/appSlice'
interface UserListProps {
  add: (id: string) => void
}

const UsersList: React.FC<UserListProps> = ({ add }) => {
  const [isLoading, setIsLoading] = useState<boolean[]>([])
  const dispatch = useAppDispatch()
  const { notification } = App.useApp()
  // fetch user-list API data
  const [loading, error, response] = useFetchData(`accounts`)
  const account: AccountDTO[] = response ? response : []

  const onChange: TableProps<AccountDTO>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const tableProps = {
    dataSource: account,
    onChange: onChange,
    pagination: { pageSize: 5 }
  }
  const handleDelete = async (id: number, index: number) => {
    setIsLoading((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    axiosClient
      .delete(`/account/${id}`)
      .then((response) => {
        setIsLoading((prevLoadings) => {
          const newLoadings = [...prevLoadings]
          newLoadings[index] = false
          return newLoadings
        })
        if (response) {
          notification.success({ message: 'Delete successful' })
          dispatch(reFetchData())
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      })
      .catch((err) => {
        setIsLoading((prevLoadings) => {
          const newLoadings = [...prevLoadings]
          newLoadings[index] = false
          return newLoadings
        })
        notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
      })
  }

  return (
    <div className='space-y-5'>
      {error ? (
        <div className='w-full flex flex-row flex-wrap items-center justify-center gap-2'>
          <Result title='Failed to fetch' subTitle={error} status='error' />
        </div>
      ) : (
        <Table {...tableProps} loading={loading} rowKey='id'>
          <Table.Column<AccountDTO>
            dataIndex='id'
            title='Id'
            defaultSortOrder='descend'
            sorter={(a, b) => Number(a.id) - Number(b.id)}
          />
          <Table.Column<AccountDTO>
            dataIndex='lastName'
            title='Last Name'
            defaultSortOrder='descend'
            sorter={(a, b) => a.lastName.localeCompare(b.lastName)}
          />
          <Table.Column<AccountDTO>
            dataIndex='email'
            title='Email'
            defaultSortOrder='descend'
            sorter={(a, b) => a.email.localeCompare(b.email)}
          />
          <Table.Column<AccountDTO>
            dataIndex='phoneNum'
            title='Phone'
            defaultSortOrder='descend'
            sorter={(a, b) => a.phoneNum.localeCompare(b.phoneNum)}
          />
          <Table.Column<AccountDTO>
            dataIndex='roleId'
            title='Role'
            defaultSortOrder='descend'
            sorter={(a, b) => Number(a.roleId) - Number(b.roleId)}
            render={(roleId) => (
              <Tag className='w-[80px] text-center uppercase' color={userRoleIdAsResponse(roleId).color}>
                {userRoleIdAsResponse(roleId).level}
              </Tag>
            )}
          />
          <Table.Column<AccountDTO>
            title='Actions'
            dataIndex='id'
            key='actions'
            align='center'
            render={(id, record, index) => (
              <Space>
                <Button size='small' icon={<EyeOutlined />} onClick={() => add(id)}>
                  View
                </Button>
                <Button
                  loading={isLoading[index]}
                  disabled={isLoading[index]}
                  size='small'
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(id, index)}
                >
                  Delete
                </Button>
              </Space>
            )}
          />
        </Table>
      )}
    </div>
  )
}
const Index = React.memo(UsersList)
export default Index
