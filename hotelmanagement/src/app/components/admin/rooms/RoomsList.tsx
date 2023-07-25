import { App, Avatar, Button, Result, Space, Table, TableProps, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { roomStatusAsResponse, roomTypeAsResponse } from '../../../utils/responseAsStatus'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { RoomCategoryDTO, RoomDTO } from '@/app/data/room'
import axiosClient from '@/app/utils/api/axiosClient'
import { useAppDispatch } from '@/app/hooks/reduxHooks'
import { reFetchData } from '@/app/redux/slices/appSlice'
import useFetchData from '@/app/hooks/useFetchData'

interface RoomsListProps {
  add: (id: string) => void
}

const RoomsList: React.FC<RoomsListProps> = ({ add }) => {
  const [isLoading, setIsLoading] = useState<boolean[]>([])
  const dispatch = useAppDispatch()
  const { notification } = App.useApp()

  // fetch room-list API data
  const [loading, error, response] = useFetchData(`/rooms`)
  const rooms: RoomDTO[] = response ? response : []
  const onChange: TableProps<RoomDTO>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const tableProps = {
    dataSource: rooms,
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
      .delete(`/deleteRoom/${id}`)
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
          <Table.Column<RoomDTO>
            dataIndex='image'
            title='Room Image'
            align='center'
            render={(img) => <Avatar src={img} crossOrigin='anonymous' size='large' />}
          />
          <Table.Column<RoomDTO>
            dataIndex='name'
            title='Room Name'
            defaultSortOrder='descend'
            sorter={(a, b) => a.name.localeCompare(b.name)}
          />
          <Table.Column<RoomDTO>
            dataIndex='roomCategoryDTO'
            title='Room Type'
            defaultSortOrder='descend'
            align='center'
            sorter={(a, b) => a.roomCategoryDTO.name.localeCompare(b.roomCategoryDTO.name)}
            render={(type) => (
              <Tag color={roomTypeAsResponse(type.name).color}>{roomTypeAsResponse(type.name).level}</Tag>
            )}
          />
          <Table.Column<RoomDTO>
            dataIndex='price'
            title='Room Price'
            align='center'
            defaultSortOrder='descend'
            sorter={(a, b) => Number(a.price) - Number(b.price)}
            render={(price) => (
              <p>
                {price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </p>
            )}
          />
          <Table.Column<RoomDTO>
            dataIndex='rent'
            title='Room Status'
            align='center'
            defaultSortOrder='descend'
            sorter={(a, b) => (a.rent === b.rent ? 0 : a.rent ? -1 : 1)}
            render={(status) => (
              <Tag className='uppercase' color={roomStatusAsResponse(status).color}>
                {roomStatusAsResponse(status).level}
              </Tag>
            )}
          />
          <Table.Column<RoomDTO>
            title='Actions'
            dataIndex='roomId'
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

const Index = React.memo(RoomsList)
export default Index
