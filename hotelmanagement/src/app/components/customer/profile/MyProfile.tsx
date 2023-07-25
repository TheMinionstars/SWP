import { EditOutlined } from '@ant-design/icons'
import { Button, Descriptions, Image, Result, Skeleton, Tag, Tooltip, Upload, App } from 'antd'
import type { UploadProps } from 'antd'
import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { userGenderAsResponse, userRoleAsResponse } from '@/app/utils/responseAsStatus'
import ProfileEditModal from './ProfileEditModal'
import useFetchData from '@/app/hooks/useFetchData'
import { useAppSelector, useAppDispatch } from '@/app/hooks/reduxHooks'
import { RootState } from '@/app/redux/store'
import { AccountDTO } from '@/app/data/account'
import { RcFile } from 'antd/es/upload'
import axiosClient from '@/app/utils/api/axiosClient'

import { reFetchData } from '@/app/redux/slices/appSlice'

const readImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      resolve(base64String)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const MyProfile: React.FC = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.account)
  const [editProfileModal, setEditProfileModal] = useState(false)
  const { message } = App.useApp()
  const dispatch = useAppDispatch()
  // fetch user profile API data
  const [loading, error, response] = useFetchData(`/account/${userInfo?.userId}`)
  const account: AccountDTO = response
  // const loading = false
  // const error = null

  // const account: AccountDTO = {
  //   id: 1,
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   email: 'johndoe@example.com',
  //   password: 'password123',
  //   avatar: '/default.jpg',
  //   sex: 'Nam',
  //   phoneNum: '1234567890',
  //   address: '123 Street, City',
  //   roleId: 1
  // }

  // handle to change user avatar upload
  const props: UploadProps = {
    // accept: 'image/*',
    // name: 'avatar',
    // action: `${publicRuntimeConfig.API_BASE_URL}/api/v1/avatar-update`,
    // method: 'put',
    // headers: { authorization: `Bearer ${token}` },
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      dispatch(reFetchData())
      return false
    }
  }

  return (
    <>
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
        {error ? (
          <Result title='Failed to fetch' subTitle={error} status='error' />
        ) : (
          <Descriptions
            title='Profile Information'
            bordered
            extra={
              <Button
                style={{ marginTop: '10px', marginRight: '20px' }}
                onClick={() => setEditProfileModal(true)}
                shape='default'
                type='primary'
                size='large'
              >
                Edit Profile
              </Button>
            }
          >
            <Descriptions.Item label='Avatar' span={3}>
              <Image
                style={{ width: '100px', height: '100px' }}
                src={account ? account.avatar : 'error'}
                fallback='data:image/png;base64,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'
                crossOrigin='anonymous'
                alt='user-image'
              />

              {/* user avatar change */}
              <div style={{ position: 'absolute', marginTop: '-7rem', marginLeft: '5.5rem' }}>
                <ImgCrop showGrid rotationSlider>
                  <Upload {...props}>
                    <Tooltip title='Click to change Avatar'>
                      <Button icon={<EditOutlined />} type='default' shape='circle' />
                    </Tooltip>
                  </Upload>
                </ImgCrop>
              </div>
            </Descriptions.Item>

            <Descriptions.Item label='First Name'>
              {account ? account.firstName : 'Default First Name'}
            </Descriptions.Item>
            <Descriptions.Item label='Last Name' span={2}>
              {account ? account.lastName : 'Default Last Name'}
            </Descriptions.Item>
            <Descriptions.Item label='Email'>{account ? account.email : 'Default email'}</Descriptions.Item>
            <Descriptions.Item label='Phone' span={2}>
              {account ? account.phoneNum : 'Default phone'}
            </Descriptions.Item>

            <Descriptions.Item label='Gender'>
              <Tag
                style={{ width: '80px', textAlign: 'center', textTransform: 'capitalize' }}
                color={userGenderAsResponse(account?.sex).color}
              >
                {userGenderAsResponse(account?.sex).level}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label='Role' span={2}>
              <Tag
                style={{ width: '80px', textAlign: 'center', textTransform: 'capitalize' }}
                color={userRoleAsResponse(userInfo?.role).color}
              >
                {userRoleAsResponse(userInfo?.role).level}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label='Address' span={3}>
              {account ? account.address : 'Default address'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Skeleton>

      {/* profile edit modal component */}
      {editProfileModal && (
        <ProfileEditModal editProfileModal={editProfileModal} setEditProfileModal={setEditProfileModal} />
      )}
    </>
  )
}
const Index = React.memo(MyProfile)
export default Index
