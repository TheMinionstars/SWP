import { Link } from 'react-router-dom'
import UserLayout from '../layouts/user/Layout'
import BlogList from '../components/customer/blog/BlogList'
import BlogContainer from '../components/customer/blog/BlogContainer'

const BlogsPage: React.FC = () => {
  return (
    <UserLayout activeLink='blogs'>
      <div className='!container !px-8 !mx-auto xl:!px-5  !max-w-screen-lg !py-5 lg:!py-8'>
        <BlogContainer />
      </div>
    </UserLayout>
  )
}

export default BlogsPage
