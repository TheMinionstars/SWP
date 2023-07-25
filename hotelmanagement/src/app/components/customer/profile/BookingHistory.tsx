import { roomStatusAsResponse } from '@/app/utils/responseAsStatus'
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Image,
  Result,
  Row,
  Skeleton,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Upload
} from 'antd'
import React, { useState } from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import BookingDetail from './BookingDetail'
interface DataType {
  id: string
  room_images: string
  room_name: string
  room_type: string
  room_status: string
  room_price: number
  room_size: number
}
interface DescriptionItemProps {
  title: string
  content: React.ReactNode
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
)
const BookingHistory: React.FC = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [openId, setOpenId] = useState<string>('')
  const loading = false
  const error = null
  const response = {
    data: [
      {
        id: '1',
        room_images: '/images/jpeg/room-1.jpeg',
        room_name: 'Room 1',
        room_type: 'couple',
        room_status: 'available',
        room_price: 1000000,
        room_size: 20
      },
      {
        id: '2',
        room_images: '/images/jpeg/room-2.jpeg',
        room_name: 'Room 2',
        room_type: 'single',
        room_status: 'unavailable',
        room_price: 2000000,
        room_size: 10
      },
      {
        id: '3',
        room_images: '/images/jpeg/room-3.jpeg',
        room_name: 'Room 3',
        room_type: 'couple',
        room_status: 'booked',
        room_price: 3000000,
        room_size: 20
      }
    ]
  }
  const showDrawer = (id: string) => {
    setOpen(true)
    setOpenId(id)
  }

  const onClose = () => {
    setOpen(false)
  }
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const tableProps = {
    dataSource: response.data,
    onChange: onChange,
    pagination: { pageSize: 5 }
  }
  return (
    <>
      <Drawer width='100%' placement='right' onClose={onClose} open={open}>
        <BookingDetail id={openId} />
      </Drawer>
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
        {error ? (
          <Result title='Failed to fetch' subTitle={error} status='error' />
        ) : (
          <Table {...tableProps} loading={loading} rowKey='id' className='h-full'>
            <Table.Column<DataType>
              dataIndex='room_images'
              title='Room Image'
              render={(img) => <Avatar src={img} crossOrigin='anonymous' size='large' />}
            />
            <Table.Column<DataType>
              dataIndex='room_name'
              title='Room Name'
              defaultSortOrder='descend'
              sorter={(a, b) => a.room_name.localeCompare(b.room_name)}
            />
            <Table.Column<DataType>
              dataIndex='room_type'
              title='Room Type'
              defaultSortOrder='descend'
              align='center'
              sorter={(a, b) => a.room_type.localeCompare(b.room_type)}
              render={(type) => <Tag color={type === 'couple' ? 'magenta' : 'purple'}>{type}</Tag>}
            />
            <Table.Column<DataType>
              dataIndex='room_price'
              title='Room Price'
              defaultSortOrder='descend'
              sorter={(a, b) => Number(a.room_price) - Number(b.room_price)}
              render={(price) => (
                <p>
                  {price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </p>
              )}
            />
            <Table.Column<DataType>
              dataIndex='room_status'
              title='Room Status'
              align='center'
              defaultSortOrder='descend'
              sorter={(a, b) => a.room_status.localeCompare(b.room_status)}
              render={(status) => (
                <Tag className='uppercase' color={roomStatusAsResponse(status).color}>
                  {roomStatusAsResponse(status).level}
                </Tag>
              )}
            />
            <Table.Column<DataType>
              title='Actions'
              dataIndex='id'
              key='actions'
              align='center'
              render={(id) => <Button size='small' icon={<EyeOutlined />} onClick={() => showDrawer(id)} />}
            />
          </Table>
        )}
      </Skeleton>
    </>
  )
}

export default BookingHistory
