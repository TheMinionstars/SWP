/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'antd'
import UserLayout from '@layouts/user/Layout'
import Services from '../components/customer/home/Services'
import LatestBlogs from '../components/customer/home/LatestBlogs'
import Hero from '../components/customer/home/Hero'
import Banner from '../components/customer/home/Banner'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <UserLayout activeLink='home'>
      <div>
        <Hero>
          <Banner title='luxurious rooms' subtitle='deluxe rooms starting at 1.000.000 vnđ'>
            <Link to='/rooms'>
              <Button className='capitalize' type='primary'>
                our rooms
              </Button>
            </Link>
          </Banner>
        </Hero>

        <Services />
        <LatestBlogs />
      </div>
    </UserLayout>
  )
}
export default HomePage
