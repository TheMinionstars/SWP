import React from 'react'

import { List } from 'antd'
import Room from '../../shared/Room'
import { PaginationConfig } from 'antd/es/pagination'
import { RoomDTO as IRoom } from '@/app/data/room'

export type RoomListProps = {
  rooms: IRoom[]
  col: number
  paginationProp?: PaginationConfig
  loading: boolean
}

const RoomList: React.FC<RoomListProps> = ({ rooms, col, paginationProp, loading }) => {
  return (
    <List
      pagination={paginationProp ? paginationProp : false}
      loading={loading}
      grid={{ gutter: 16, column: col }}
      itemLayout='horizontal'
      dataSource={rooms}
      renderItem={(item) => (
        <List.Item>
          <Room room={item} />
        </List.Item>
      )}
    />
  )
}
const Index = React.memo(RoomList)
export default Index
