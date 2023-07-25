import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { App, Button, Form, Input } from 'antd'
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks'
import { LoginAction, loginAsync } from '@/app/redux/slices/accountSlice'
import type { RootState } from '@redux/store'
import { LoginPayload } from '../data/auth'

const LoginPage: React.FC = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.account)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { message, notification } = App.useApp()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      const payload: LoginPayload = {
        email: values.email,
        password: values.password
      }

      const data: LoginAction = {
        notification: notification,
        navigate: navigate,
        payload: payload
      }
      await dispatch(loginAsync(data))
      form.resetFields()
    } catch (err) {
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
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
          <div className='max-w-lg mx-auto'>
            <div className='flex gap-5'>
              <h1 className='text-2xl font-semibold'>
                {'  '} Sign In FPT Hotel {'  '}
              </h1>
              <Link to='/'>
                <img src='/Logo1.png' className='h-8 w-auto' alt='Logo' />
              </Link>
            </div>
            <Form name='loginForm' form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
              <div className='divide-y divide-gray-200'>
                <div className='py-8 text-base leading-6 space-y-10 text-gray-700 sm:text-lg sm:leading-7'>
                  <Form.Item
                    name='email'
                    rules={[{ required: true, message: 'Please input your username!' }, { validator: validateEmail }]}
                  >
                    <div className='relative'>
                      <Input
                        autoComplete='off'
                        id='email'
                        type='text'
                        className='peer !shadow-none !border-0 !placeholder-transparent !h-10 !w-full !border-b-2 !border-gray-300 !text-gray-900 !focus:outline-none !focus:borer-rose-600'
                        placeholder='Email address'
                      />
                      <label
                        htmlFor='email'
                        className='cursor-text absolute left-2 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                      >
                        Email Address
                      </label>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name='password'
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { validator: validatePassword }
                    ]}
                  >
                    <div className='relative'>
                      <Input
                        autoComplete='off'
                        id='password'
                        type='password'
                        className='peer !border-0 !shadow-none  !placeholder-transparent !h-10 !w-full !border-b-2 !border-gray-300 !text-gray-900 !focus:outline-none !focus:borer-rose-600'
                        placeholder='Password'
                      />
                      <label
                        htmlFor='password'
                        className='cursor-text absolute left-2 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                      >
                        Password
                      </label>
                    </div>
                  </Form.Item>
                  {/* <Link className='!btn-forgot-password' to='/forgot-password'>
                    Forgot Password
                  </Link> */}

                  <Form.Item>
                    <div className='relative w-full'>
                      <Button
                        loading={isLoading}
                        disabled={isLoading}
                        type='primary'
                        htmlType='submit'
                        className='bg-blue-500 text-white rounded-md w-full'
                      >
                        Sign In
                      </Button>
                    </div>
                  </Form.Item>
                </div>
                <div className='w-full'>
                  <Button
                    onClick={() => navigate('/register')}
                    type='primary'
                    className='w-full mt-5 text-center bg-blue-500 text-white rounded-md px-2 py-1'
                  >
                    Create New Account
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
const Index = React.memo(LoginPage)
export default Index
