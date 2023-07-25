import { Layout } from 'antd'
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons'

const { Footer } = Layout

const AdminFooter: React.FC = () => {
  return (
    <Footer className='text-center font-text-font font-medium bg-gray-900 text-white py-6'>
      <div className='flex flex-wrap justify-center items-center'>
        <div className='mr-4 mb-4 sm:mb-0'>
          <MailOutlined className='text-xl' />
          <span className='ml-2'>example@example.com</span>
        </div>
        <div className='mr-4 mb-4 sm:mb-0'>
          <PhoneOutlined className='text-xl' />
          <span className='ml-2'>(+123) 456-7890</span>
        </div>
        <div className='mb-4 sm:mb-0'>
          <EnvironmentOutlined className='text-xl' />
          <span className='ml-2'>123 Main St, City, Country</span>
        </div>
      </div>
      <div className='mt-6'>
        ©2023 FPT Hotel — Developed By{' '}
        <a
          className='text-color-primary hover:text-color-secondary'
          href='http://www.samiurrahmanmukul.epizy.com'
          target='_blank'
          rel='noreferrer'
        >
          Duong
        </a>
      </div>
    </Footer>
  )
}

export default AdminFooter
