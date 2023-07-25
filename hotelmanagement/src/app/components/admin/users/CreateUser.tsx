import { useAppDispatch } from '@/app/hooks/reduxHooks'
import { reFetchData } from '@/app/redux/slices/appSlice'
import axiosClient from '@/app/utils/api/axiosClient'
import { EnvironmentOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, App } from 'antd'
import React, { useState } from 'react'

const CreateUser: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { notification, message } = App.useApp()
  // function to handle register new user
  const onFinish = (values: any) => {
    setLoading(true)
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNum: values.phone,
      roleId: values.role,
      sex: values.gender,
      address: values.address,
      password: values.password
    }
    console.log(payload)
    axiosClient
      .post('/admin/account', payload)
      .then((response) => {
        setLoading(false)
        if (response) {
          notification.success({ message: 'New user create successful' })
          form.resetFields()
          dispatch(reFetchData())
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      })
      .catch((err) => {
        setLoading(false)
        notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
      })
  }
  const onFinishFailed = (errorInfo: any) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }
  return (
    <Form
      form={form}
      className='login-form'
      name={`create-new-user-${Math.random()}`}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout='vertical'
    >
      <div className='two-grid-column'>
        <Form.Item
          className='w-full md:w-1/2'
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
          className='w-full md:w-1/2'
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
      </div>

      <div className='two-grid-column'>
        <Form.Item
          className='w-full md:w-1/2'
          label='Email'
          name='email'
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
            size='large'
            type='email'
            allowClear
          />
        </Form.Item>

        <Form.Item
          className='w-full md:w-1/2'
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
      </div>

      <div className='two-grid-column'>
        <Form.Item
          className='w-full md:w-1/2'
          label='Role'
          name='role'
          rules={[
            {
              required: true,
              message: 'Please input your Role!'
            }
          ]}
        >
          <Select
            placeholder='-- select user role --'
            optionFilterProp='children'
            options={[
              { value: 1, label: 'Admin' },
              { value: 2, label: 'Staff' },
              { value: 3, label: 'Customer' }
            ]}
            size='large'
            allowClear
          />
        </Form.Item>

        <Form.Item
          className='w-full md:w-1/2'
          label='Gender'
          name='gender'
          rules={[
            {
              required: true,
              message: 'Please input your Gender!'
            }
          ]}
        >
          <Select
            placeholder='-- select user gender --'
            optionFilterProp='children'
            options={[
              { value: 'nam', label: 'Nam' },
              { value: 'nữ', label: 'Nữ' }
            ]}
            size='large'
            allowClear
          />
        </Form.Item>
      </div>

      <div className='two-grid-column'>
        <Form.Item
          className='w-full md:w-[49.5%]'
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
            size='large'
            type='text'
            allowClear
          />
        </Form.Item>

        <Form.Item
          className='w-full md:w-1/2'
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
      </div>

      <Form.Item>
        <Button
          className='login-form-button mt-4'
          htmlType='submit'
          type='primary'
          size='large'
          loading={loading}
          disabled={loading}
        >
          Register User
        </Button>
      </Form.Item>
    </Form>
  )
}
const Index = React.memo(CreateUser)
export default Index
