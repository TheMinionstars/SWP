import { Grid, Result } from 'antd'

const { useBreakpoint } = Grid

import React from 'react'
import BlogList from '../blog/BlogList'
import useFetchData from '@/app/hooks/useFetchData'
import { Blog } from '@/app/data/blog'
// const blogs = [
//   {
//     title: 'Blog 1',
//     slug: 'blog-1',
//     excerpt: 'The excerpt is used in blog feeds, and also for search results',
//     thumbnail: '/images/jpeg/room-1.jpeg',
//     publishedAt: new Date().toISOString()
//   },
//   {
//     title: 'Blog 2',
//     slug: 'blog-2',
//     excerpt: 'The excerpt is used in blog feeds, and also for search results',
//     thumbnail: '/images/jpeg/room-2.jpeg',
//     publishedAt: new Date().toISOString()
//   },
//   {
//     title: 'Blog 3',
//     slug: 'blog-3',
//     excerpt: 'The excerpt is used in blog feeds, and also for search results',
//     thumbnail: '/images/jpeg/room-3.jpeg',
//     publishedAt: new Date().toISOString()
//   }
// ]
const LatestBlogs: React.FC = () => {
  const screens = useBreakpoint()
  const [loading, error, response] = useFetchData(`/blogs`)

  return (
    <section className='services'>
      <div className='section-title'>
        <h4>See our latest blogs</h4>
      </div>
      <div className='w-full  px-[1.5rem] mx-auto'>
        {error ? (
          <Result title='Failed to fetch' subTitle={error} status='error' />
        ) : (
          <BlogList
            col={screens.md ? 3 : 1}
            blogs={response ? (response.slice(0, 3) as Blog[]) : []}
            loading={loading}
          />
        )}
      </div>
    </section>
  )
}

export default LatestBlogs
