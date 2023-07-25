import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { App, Button, Form, Input, Select } from 'antd'
import axiosClient from '../utils/api/axiosClient'

import { RegisterPayload } from '../data/auth'

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { notification, message } = App.useApp()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  // function to handle register new user
  const onFinish = (values: any) => {
    setLoading(true)
    const payload: RegisterPayload = {
      // default
      email: values.email,
      phone: values.phone,
      password: values.password,

      // cải thiện thêm
      lastName: values.lastName,
      firstName: values.firstName,
      sex: values.gender
    }

    axiosClient
      .post('/registerAccount', payload)
      .then((response) => {
        setLoading(false)
        if (response) {
          notification.success({ message: 'Your registration successful' })
          // form.resetFields()
          navigate('/login')
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
  const validateEmail = (rule: any, value: any) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject('Please enter a valid email address!')
    }
  }

  const validatePassword = (rule: any, value: any) => {
    if (!value || value.length >= 4) {
      return Promise.resolve()
    } else {
      return Promise.reject('Password should have at least 4 characters!')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <div className='max-w-md mx-auto'>
            <div className='flex gap-5'>
              <h1 className='text-2xl font-semibold'>Sign Up FPT Hotel</h1>
              <Link to='/'>
                <img src='/Logo1.png' className='h-8 w-auto' />
              </Link>
            </div>
            <Form
              form={form}
              layout='vertical'
              name='registerForm'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <div className='divide-y divide-gray-200'>
                <div className='py-8 text-base leading-6 space-y-10 text-gray-700 sm:text-lg sm:leading-7'>
                  <Form.Item
                    label='First Name'
                    name='firstName'
                    rules={[{ required: true, message: 'Please input your firstName!' }]}
                  >
                    <div className='relative'>
                      <Input type='text' placeholder='First Name' />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label='Last Name'
                    name='lastName'
                    rules={[{ required: true, message: 'Please input your lastName!' }]}
                  >
                    <div className='relative'>
                      <Input type='text' placeholder='Last Name' />
                    </div>
                  </Form.Item>
                  <Form.Item
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
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Please input your email!' }, { validator: validateEmail }]}
                  >
                    <div className='relative'>
                      <Input id='email' type='text' placeholder='Email address' />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label='Phone'
                    name='phone'
                    rules={[{ required: true, message: 'Please input your phone' }]}
                  >
                    <div className='relative'>
                      <Input autoComplete='off' id='phone' type='text' placeholder='Phone' />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { validator: validatePassword }
                    ]}
                  >
                    <div className='relative'>
                      <Input autoComplete='off' id='password' type='password' placeholder='Password' />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label='Password Confirm'
                    name='passwordConfirm'
                    rules={[
                      { required: true, message: 'Please input your password confirm!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject('Password does not match!')
                        }
                      })
                    ]}
                  >
                    <div className='relative'>
                      <Input autoComplete='off' id='passwordConfirm' type='password' placeholder='Password confirm' />
                    </div>
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <div className='relative'>
                      <Button
                        loading={loading}
                        disabled={loading}
                        type='primary'
                        htmlType='submit'
                        className='bg-blue-500 text-white rounded-md px-2 py-1'
                      >
                        Sign up
                      </Button>
                    </div>
                  </Form.Item>
                  <div className='text-grey-dark mt-6 w-full text-center'>
                    Already have an account?{' '}
                    <Link to='/login' className='no-underline border-b border-blue text-blue'>
                      Log in
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
const Index = React.memo(RegisterPage)
export default Index
