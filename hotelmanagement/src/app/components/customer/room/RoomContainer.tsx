import React, { useState, useEffect } from 'react'
import RoomList from './RoomList'
import RoomFilter, { Filter } from './RoomFilter'
import useFetchData from '@/app/hooks/useFetchData'
import { Result, Grid } from 'antd'
import { PaginationConfig } from 'antd/es/pagination'
import { RoomDTO } from '@/app/data/room'
const { useBreakpoint } = Grid
const RoomContainer: React.FC = () => {
  const screens = useBreakpoint()
  const [filter, setFilter] = useState<Filter>({
    search: '',
    roomType: 'all',
    sort: 'asce',
    page: 1,
    limit: 9
  })
  // fetch room-list API data
  const [loading, error, response] = useFetchData(`/rooms`)

  const filteredRooms: RoomDTO[] = response
    ? response.filter((room: RoomDTO) => {
        const isMatchSearch = filter.search ? room.name.toLowerCase().includes(filter.search.toLowerCase()) : true

        const isMatchRoomType = filter.roomType !== 'all' ? room.roomCategoryDTO.name === filter.roomType : true

        return isMatchSearch && isMatchRoomType
      })
    : []
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (filter.sort === 'asce') {
      return a.price - b.price
    } else if (filter.sort === 'desc') {
      return b.price - a.price
    } else {
      return 0
    }
  })

  const paginatedRooms = sortedRooms.slice((filter.page - 1) * filter.limit, filter.page * filter.limit)
  // const loading = false
  // const error = null
  // const response = {
  //   data: rooms
  // }
  const paginationProp: PaginationConfig = {
    onChange: (page: number) => {
      setFilter((prevState) => ({ ...prevState, page: page }))
    },
    total: filteredRooms.length,
    current: filter.page,
    position: 'bottom',
    align: 'center',
    pageSize: filter.limit
  }

  // reset filter options
  useEffect(() => {
    setFilter((prevState) => ({ ...prevState, page: 1 }))
  }, [filter.limit, filter.search, filter.roomType, filter.sort])
  return (
    <div className='m-[0_auto] max-w-[1180px] space-y-10'>
      <div className='box'>
        <RoomFilter filter={filter} setFilter={setFilter} />
      </div>
      {error ? (
        <Result title='Failed to fetch' subTitle={error} status='error' />
      ) : (
        <div className='box'>
          <RoomList rooms={paginatedRooms} col={screens.md ? 3 : 1} paginationProp={paginationProp} loading={loading} />
        </div>
      )}
    </div>
  )
}

const Index = React.memo(RoomContainer)
export default Index
