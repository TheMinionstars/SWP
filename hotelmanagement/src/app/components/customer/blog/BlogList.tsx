import React from 'react'

import { List } from 'antd'
import { PaginationConfig } from 'antd/es/pagination'
import BlogCard from '../../shared/BlogCard'
import { Blog } from '@/app/data/blog'

export type BlogListProps = {
  blogs: Blog[]
  col: number
  paginationProp?: PaginationConfig
  loading: boolean
}

const BlogList: React.FC<BlogListProps> = ({ blogs, col, paginationProp, loading }) => {
  return (
    <List
      pagination={paginationProp ? paginationProp : false}
      loading={loading}
      grid={{ gutter: 32, column: col }}
      itemLayout='horizontal'
      dataSource={blogs}
      renderItem={(item, index) => (
        <List.Item>
          <BlogCard blog={item} />
        </List.Item>
      )}
    />
  )
}
const Index = React.memo(BlogList)
export default Index
