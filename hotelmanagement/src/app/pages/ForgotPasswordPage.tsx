import { MailOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import React, { useState } from 'react'

const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    // setLoading(true)
    // axiosClient
    //   .post('/api/v1/auth/forgot-password', values)
    //   .then((response: any) => {
    //     setLoading(false)
    //     if (response?.result_code === 0) {
    //       notificationWithIcon(
    //         'success',
    //         'SUCCESS',
    //         response?.result?.message || 'Your password reset mail send successful'
    //       )
    //       form.resetFields()
    //       navigate('/login')
    //     } else {
    //       notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error')
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false)
    //     notificationWithIcon(
    //       'error',
    //       'ERROR',
    //       err?.response?.data?.result?.error?.message ||
    //         err?.response?.data?.result?.error ||
    //         'Sorry! Something went wrong. App server error'
    //     )
    //   })
  }

  return (
    <div style={{ width: '400px', height: 'calc(100vh - 205px)', margin: '0 auto' }}>
      <Form
        form={form}
        style={{ paddingTop: '200px' }}
        initialValues={{ remember: true }}
        name='forgot-password-form'
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder='Email' size='large' />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' type='primary' size='large' block loading={loading} disabled={loading}>
            Forgot Password
          </Button>
        </Form.Item>

        <Link className='!btn-login-registration' to='/login'>
          Or Login Here!
        </Link>
      </Form>
    </div>
  )
}
const Index = React.memo(ForgotPasswordPage)
export default Index
