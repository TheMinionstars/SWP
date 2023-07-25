import { useAppSelector } from '@/app/hooks/reduxHooks'
import { RootState } from '@/app/redux/store'
import { useNavigate } from 'react-router-dom'
const UserBox: React.FC = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.account)
  const navigate = useNavigate()

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className='logo-box' onClick={() => navigate('/admin/profile')}>
      <img className='w-[50px] h-auto rounded-full' src='/default.jpg' crossOrigin='anonymous' alt='avatar-img' />
      <h2 className='user-name'>{userInfo ? userInfo?.email : 'Default email'}</h2>
    </div>
  )
}

export default UserBox
