import React, { useState } from 'react'
import CkEditor from '../../ckeditor'
import { Typography, Input, Form, Button, App } from 'antd'
import axiosClient from '@/app/utils/api/axiosClient'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks'
import { reFetchData } from '@/app/redux/slices/appSlice'
import { RootState } from '@/app/redux/store'
const { Title } = Typography

interface ContentValue {
  content?: string
}

interface ContentInputProps {
  value?: ContentValue
  onChange?: (value: ContentValue) => void
}
const { TextArea } = Input
const ContentInput: React.FC<ContentInputProps> = ({ value = {}, onChange }) => {
  const [content, setContent] = useState('')
  const triggerChange = (changedValue: { content?: string }) => {
    onChange?.({ content, ...value, ...changedValue })
  }
  const onContentChange = (value: string) => {
    setContent(value)
    triggerChange({ content: value })
  }
  return <CkEditor onContentChange={onContentChange} />
}

const CreateBlog: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { message, notification } = App.useApp()
  const { userInfo } = useAppSelector((state: RootState) => state.account)
  // function to handle register new user
  const onFinish = (values: any) => {
    setLoading(true)
    const data = {
      content: values.content,
      title: values.title,
      image: values.image,
      accountId: userInfo?.userId
    }
    console.log(data)
    const url = `/blog?title=${data.title}&content=${data.content}&image=${data.image}&accountId=${data.accountId}`
    axiosClient
      .post(url)
      .then((response: any) => {
        setLoading(false)
        if (response) {
          notification.success({ message: 'Create new Blog successful' })
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
  return (
    <Form form={form} name={`create-new-blog-${Math.random()}`} onFinish={onFinish} layout='vertical'>
      <div className='box'>
        <Form.Item
          className='w-full'
          label={<Title level={4}>Title</Title>}
          name='title'
          rules={[
            {
              required: true,
              message: 'Please input your Title!'
            }
          ]}
        >
          <Input placeholder='Title' size='large' type='text' allowClear />
        </Form.Item>
      </div>
      <div className='box'>
        <Form.Item
          className='w-full'
          label={<Title level={4}>Image</Title>}
          name='image'
          rules={[
            {
              required: true,
              message: 'Please input your Image!'
            }
          ]}
        >
          <Input placeholder='Image' size='large' type='text' allowClear />
        </Form.Item>
      </div>
      <div className='box'>
        <Form.Item
          className='w-full'
          label={<Title level={4}>Content</Title>}
          name='content'
          rules={[
            {
              required: true,
              message: 'Please input your Content!'
            }
          ]}
        >
          <TextArea rows={4} showCount maxLength={100} />
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
          Create Blog
        </Button>
      </Form.Item>
    </Form>
  )
}

const Index = React.memo(CreateBlog)
export default Index
