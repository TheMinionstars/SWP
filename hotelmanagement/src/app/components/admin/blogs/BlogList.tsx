import React, { useState } from 'react'
import { Button, Drawer, Space, Statistic, Table, Tag, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd/es/table'
import CountUp from 'react-countup'
import CreateBlog from './CreateBlog'
import { Formatter } from 'antd/es/statistic/utils'
import { Blog } from '@/app/data/blog'
import useFetchData from '@/app/hooks/useFetchData'
const { Title } = Typography

const formatter: Formatter = (value) => <CountUp end={value as number} separator=',' />

interface BlogListProps {
  add: (id: string) => void
}
const BlogList: React.FC<BlogListProps> = ({ add }) => {
  const statusFilter = [
    {
      text: 'Published',
      value: 'Published'
    },
    {
      text: 'Rejected',
      value: 'Rejected'
    },
    {
      text: 'Pending',
      value: 'Pending'
    }
  ]
  // fetch room-list API data
  const [loading, error, response] = useFetchData(`/blogs`)
  const blogs: Blog[] = response ? response : []

  const onChange: TableProps<Blog>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const tableProps = {
    dataSource: blogs,
    onChange: onChange,
    pagination: { pageSize: 5 }
  }

  return (
    <div className='h-full relative'>
      <Table {...tableProps} rowKey='id'>
        <Table.Column<Blog>
          dataIndex='blogId'
          title='Id'
          defaultSortOrder='descend'
          sorter={(a, b) => a.blogId - b.blogId}
        />
        <Table.Column<Blog>
          dataIndex='title'
          title='Title'
          defaultSortOrder='descend'
          sorter={(a, b) => a.title.length - b.title.length}
        />

        <Table.Column<Blog>
          dataIndex='createAt'
          title='Created At'
          defaultSortOrder='descend'
          render={(value) => value.split('T')[0]}
          sorter={(a, b) => {
            const dateA = new Date(a.createAt).getTime()
            const dateB = new Date(b.createAt).getTime()
            return dateA - dateB
          }}
        />
        <Table.Column<Blog>
          width='150px'
          align='center'
          title='Actions'
          dataIndex='blogId'
          key='actions'
          render={(id) => <Button size='small' icon={<EyeOutlined />} onClick={() => add(id)} />}
        />
      </Table>
    </div>
  )
}

export default BlogList
