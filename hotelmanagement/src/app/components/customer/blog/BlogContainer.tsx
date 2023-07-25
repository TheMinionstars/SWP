import { PaginationConfig } from 'antd/es/pagination'
import BlogList from './BlogList'
import React, { useState } from 'react'
import useFetchData from '@/app/hooks/useFetchData'
import { Result, Grid } from 'antd'
import { Blog } from '@/app/data/blog'
const { useBreakpoint } = Grid
const BlogContainer: React.FC = () => {
  const screens = useBreakpoint()
  const [filter, setFilter] = useState({
    page: 1,
    limit: 12
  })
  const [loading, error, response] = useFetchData(`/blogs`)
  const paginationProp: PaginationConfig = {
    onChange: (page: number) => {
      setFilter((prevState) => ({ ...prevState, page: page }))
    },
    total: response ? response.length - 2 : 0,
    current: filter.page,
    position: 'bottom',
    align: 'center',
    pageSize: filter.limit
  }
  return (
    <div className='space-y-8'>
      {error ? (
        <Result title='Failed to fetch' subTitle={error} status='error' />
      ) : (
        <>
          <BlogList
            col={screens.md ? 2 : 1}
            blogs={response ? (response.slice(0, 2) as Blog[]) : []}
            loading={loading}
          />
          <BlogList
            col={screens.md ? 3 : 1}
            blogs={response ? (response.slice(2, response.length) as Blog[]) : []}
            loading={loading}
          />
        </>
      )}
    </div>
  )
}
const Index = React.memo(BlogContainer)
export default Index
