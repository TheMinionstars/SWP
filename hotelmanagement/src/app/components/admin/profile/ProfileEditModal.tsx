import React, { useEffect, useState } from 'react'
import { EnvironmentOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Modal, Result, Select, App } from 'antd'
import Loading from '../../shared/Loading'
import dayjs from 'dayjs'
import useFetchData from '@/app/hooks/useFetchData'
import axiosClient from '@/app/utils/api/axiosClient'
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks'
import { reFetchData } from '@/app/redux/slices/appSlice'
import { RootState } from '@/app/redux/store'

export type ProfileEditModalProps = {
  editProfileModal: boolean
  setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ editProfileModal, setEditProfileModal }) => {
  const [loading, setLoading] = useState(false)
  const { userInfo } = useAppSelector((state: RootState) => state.account)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { message, notification } = App.useApp()
  // fetch user profile API data
  const [fetchLoading, fetchError, fetchResponse] = useFetchData(`/account/${userInfo?.userId}`)

  // set form data from API data
  useEffect(() => {
    if (fetchResponse) {
      form.setFieldsValue({
        firstName: fetchResponse?.firstName || undefined,
        lastName: fetchResponse?.lastName || undefined,
        phone: fetchResponse?.phoneNum || undefined,
        gender: fetchResponse?.sex || undefined,
        address: fetchResponse?.address || undefined
      })
    }
  }, [fetchResponse, form])
  // function to handle edit user profile
  const onFinish = (values: any) => {
    setLoading(true)
    const url = `/account/updateProfile?id=${fetchResponse.id}&firstName=${values?.firstName}&lastName=${values.lastName}&email=${fetchResponse.email}&password=${fetchResponse.password}&avatar=${fetchResponse.avatar}&sex=${values.gender}&phoneNum=${values.phone}&address=${values.address}&roleId=${fetchResponse.roleId}`

    axiosClient
      .put(url)
      .then((response: any) => {
        setLoading(false)
        if (response) {
          notification.success({ message: 'Your profile information updated successful' })
          form.resetFields()
          dispatch(reFetchData())
          setEditProfileModal(false)
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      })
      .catch((err) => {
        setLoading(false)
        notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
      })
  }
  return (
    <Modal
      title='Edit Profile Information'
      open={editProfileModal}
      onOk={() => setEditProfileModal(false)}
      onCancel={() => setEditProfileModal(false)}
      footer={[]}
      width={800}
    >
      {fetchLoading ? (
        <Loading />
      ) : fetchError ? (
        <Result title='Failed to fetch' subTitle={fetchError} status='error' />
      ) : (
        <Form form={form} className='login-form' name='create-new-user' onFinish={onFinish} layout='vertical'>
          <Form.Item
            label='First Name'
            name='firstName'
            rules={[
              {
                required: true,
                message: 'Please input your First Name!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='First Name'
              size='large'
              type='text'
              allowClear
            />
          </Form.Item>
          <Form.Item
            label='Last Name'
            name='lastName'
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Last Name'
              size='large'
              type='text'
              allowClear
            />
          </Form.Item>
          <Form.Item
            label='Phone'
            name='phone'
            rules={[
              {
                required: true,
                message: 'Please input your Phone!'
              }
            ]}
          >
            <Input
              prefix={<PhoneOutlined className='site-form-item-icon' />}
              placeholder='Phone'
              size='large'
              type='text'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Giới tính'
            name='gender'
            rules={[
              {
                required: true,
                message: 'Please input your Gender!'
              }
            ]}
          >
            <Select
              placeholder='-- select your gender --'
              optionFilterProp='children'
              options={[
                { value: 'nam', label: 'Nam' },
                { value: 'nữ', label: 'Nữ' }
              ]}
              size='large'
              allowClear
            />
          </Form.Item>

          <Form.Item
            className='w-full'
            label='Address'
            name='address'
            rules={[
              {
                required: true,
                message: 'Please input your Address!'
              }
            ]}
          >
            <Input
              prefix={<EnvironmentOutlined className='site-form-item-icon' />}
              placeholder='Address'
              size='large'
              type='text'
              allowClear
            />
          </Form.Item>

          <Form.Item className='w-full'>
            <Button
              className='mt-4 '
              htmlType='submit'
              type='primary'
              size='large'
              loading={loading}
              disabled={loading}
            >
              Update Info
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}
const Index = React.memo(ProfileEditModal)
export default Index
