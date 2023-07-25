import React, { useState } from 'react'
import { Col, Input, InputNumber, Row, Select, Slider, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export interface Filter {
  search?: string
  sort: 'asce' | 'desc'
  page: number
  limit: number
  roomType?: string
}

type RoomFilterProps = {
  filter: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

const RoomFilter: React.FC<RoomFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className='flex flex-col items-center justify-between space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
      <Input
        className='space-x-4'
        onChange={(e) => setFilter((prevState) => ({ ...prevState, search: e.target.value }))}
        placeholder='Start type here to Search...'
        prefix={<SearchOutlined />}
        value={filter.search}
        size='large'
        allowClear
      />

      <Select
        className='w-full sm:w-[240px]'
        onChange={(value) => setFilter((prevState) => ({ ...prevState, roomType: value }))}
        placeholder='-- show rows --'
        defaultValue={filter.roomType}
        size='large'
      >
        <Select.Option value='all'>All</Select.Option>
        <Select.Option value='single'>Single</Select.Option>
        <Select.Option value='double'>Double</Select.Option>
        <Select.Option value='family'>Family</Select.Option>
        <Select.Option value='presidential'>Presidential</Select.Option>
      </Select>

      <Select
        className='w-full sm:w-[240px]'
        onChange={(value) => setFilter((prevState) => ({ ...prevState, sort: value }))}
        placeholder='-- select type to sort --'
        defaultValue={filter.sort}
        size='large'
      >
        <Select.Option value='asce'>Giá tiền từ thấp đến cao</Select.Option>
        <Select.Option value='desc'>Giá tiền từ cao đến thấp</Select.Option>
      </Select>
    </div>
  )
}
const Index = React.memo(RoomFilter)
export default Index
