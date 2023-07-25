import { Avatar, Button, Result, Table, TableProps, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { bookingStatusAsResponse, roomStatusAsResponse, roomTypeAsResponse } from '../../../utils/responseAsStatus'
import { EyeOutlined } from '@ant-design/icons'
import useFetchData from '@/app/hooks/useFetchData'
import { BookingDTO } from '@/app/data/transaction'
import { AccountDTO } from '@/app/data/account'
import { RoomDTO } from '@app/data/room'
import { BookingStatus } from '@/app/data/other'
interface RoomsListProps {
  add: (id: string) => void
}
const BookingRoomList: React.FC<RoomsListProps> = ({ add }) => {
  const [loading, error, response] = useFetchData(`/bookings`)
  const bookings: BookingDTO[] = response ? response : []
  // const loading = false
  // const error = null
  // const res = {
  //   data: [
  //     {
  //       id: '1',
  //       room_images: '/images/jpeg/room-1.jpeg',
  //       room_name: 'Room 1',
  //       room_type: 'couple',
  //       room_status: 'available',
  //       room_price: 1000000,
  //       room_size: 20
  //     },
  //     {
  //       id: '2',
  //       room_images: '/images/jpeg/room-2.jpeg',
  //       room_name: 'Room 2',
  //       room_type: 'single',
  //       room_status: 'unavailable',
  //       room_price: 2000000,
  //       room_size: 10
  //     },
  //     {
  //       id: '3',
  //       room_images: '/images/jpeg/room-3.jpeg',
  //       room_name: 'Room 3',
  //       room_type: 'couple',
  //       room_status: 'booked',
  //       room_price: 3000000,
  //       room_size: 20
  //     }
  //   ]
  // }
  const onChange: TableProps<BookingDTO>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const tableProps = {
    dataSource: bookings,
    onChange: onChange,
    pagination: { pageSize: 5 }
  }
  return (
    <div className='space-y-5 h-full'>
      {/* room list ― content section */}

      {error ? (
        <div className='w-full flex flex-row flex-wrap items-center justify-center gap-2'>
          <Result title='Failed to fetch' subTitle={error} status='error' />
        </div>
      ) : (
        <Table {...tableProps} loading={loading} rowKey='accountId' className='h-full'>
          <Table.Column<BookingDTO>
            dataIndex='accountId'
            title='Name'
            defaultSortOrder='descend'
            sorter={(a, b) => {
              const aName = a.accountId.firstName + ' ' + a.accountId.lastName
              const bName = b.accountId.firstName + ' ' + b.accountId.lastName
              return aName.localeCompare(bName)
            }}
            render={(accountId: AccountDTO) => <p>{accountId.firstName + ' ' + accountId.lastName}</p>}
          />
          <Table.Column<BookingDTO>
            dataIndex='roomDTOList'
            title='Room Name'
            align='center'
            render={(room: RoomDTO[]) => <Avatar src={room[0].image} crossOrigin='anonymous' size='large' />}
          />
          <Table.Column<BookingDTO>
            dataIndex='roomDTOList'
            title='Room Type'
            defaultSortOrder='descend'
            align='center'
            sorter={(a, b) =>
              a.roomDTOList[0].roomCategoryDTO.name.localeCompare(b.roomDTOList[0].roomCategoryDTO.name)
            }
            render={(room: RoomDTO[]) => (
              <Tag color={roomTypeAsResponse(room[0].roomCategoryDTO.name).color}>
                {roomTypeAsResponse(room[0].roomCategoryDTO.name).level}
              </Tag>
            )}
          />
          <Table.Column<BookingDTO>
            dataIndex='totalPrice'
            title='Total Price'
            defaultSortOrder='descend'
            sorter={(a, b) => a.totalPrice - b.totalPrice}
            render={(price: number) => (
              <p>
                {price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </p>
            )}
          />
          <Table.Column<BookingDTO>
            dataIndex='status'
            title='Booking Status'
            align='center'
            defaultSortOrder='descend'
            sorter={(a, b) => a.status.localeCompare(b.status)}
            render={(status: BookingStatus) => (
              <Tag className='uppercase' color={bookingStatusAsResponse(status).color}>
                {bookingStatusAsResponse(status).level}
              </Tag>
            )}
          />
          <Table.Column<BookingDTO>
            title='Actions'
            dataIndex='bookingId'
            key='actions'
            align='center'
            render={(id) => <Button size='small' icon={<EyeOutlined />} onClick={() => add(id)} />}
          />
        </Table>
      )}
    </div>
  )
}

const Index = React.memo(BookingRoomList)
export default Index
