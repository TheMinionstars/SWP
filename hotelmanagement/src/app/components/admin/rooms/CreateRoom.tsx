import { RoomCategoryDTO } from '@/app/data/room'
import { useAppDispatch } from '@/app/hooks/reduxHooks'
import useFetchData from '@/app/hooks/useFetchData'
import { reFetchData } from '@/app/redux/slices/appSlice'
import axiosClient from '@/app/utils/api/axiosClient'
import { EnvironmentOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, App } from 'antd'
import React, { useState } from 'react'
const default_room_category: RoomCategoryDTO[] = [
  { id: 1, name: 'Single', amount: 7, description: 'Description Single' },
  { id: 2, name: 'Double', amount: 3, description: 'Description Double' }
]
const CreateRoom: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { notification, message } = App.useApp()
  const [loading, error, response] = useFetchData(`/roomcategories`)
  const categories: RoomCategoryDTO[] = response ? response : default_room_category
  // function to handle register new user
  const onFinish = (values: any) => {
    setIsLoading(true)
    const payload = {
      name: values.name,
      image: values.image,
      roomCategoryDTO: categories.find((category) => category.id.toString() === values.categoryId),
      price: values.price,
      isRent: false
    }
    console.log(payload)
    axiosClient
      .post('/room', payload)
      .then((response) => {
        setIsLoading(false)
        if (response) {
          notification.success({ message: 'Craete successful' })
          form.resetFields()
          dispatch(reFetchData())
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      })
      .catch((err) => {
        setIsLoading(false)
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
      initialValues={{ image: '/images/jpeg/room-1.jpeg' }}
    >
      <div className='two-grid-column'>
        <Form.Item
          className='w-full md:w-1/2'
          label='Room Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input Room Name!'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Room Name'
            size='large'
            type='text'
            allowClear
          />
        </Form.Item>

        <Form.Item
          className='w-full md:w-1/2'
          label='Image'
          name='image'
          rules={[
            {
              required: true,
              message: 'Please input Room Image!'
            }
          ]}
        >
          <Input
            prefix={<PhoneOutlined className='site-form-item-icon' />}
            placeholder='Room Image'
            size='large'
            type='text'
            allowClear
          />
        </Form.Item>
      </div>

      <div className='two-grid-column'>
        <Form.Item
          className='w-full md:w-1/2'
          label='Category'
          name='categoryId'
          rules={[
            {
              required: true,
              message: 'Please input your Category!'
            }
          ]}
        >
          <Select
            placeholder='-- select category --'
            optionFilterProp='children'
            options={categories.map((category) => ({
              value: category.id.toString(),
              label: category.name
            }))}
            size='large'
            allowClear
          />
        </Form.Item>

        <Form.Item
          className='w-full md:w-[49.5%]'
          label='Price'
          name='price'
          rules={[
            {
              required: true,
              message: 'Please input your Price!'
            }
          ]}
        >
          <Input
            min={0}
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Price'
            size='large'
            type='number'
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
          loading={isLoading}
          disabled={isLoading}
        >
          Create Room
        </Button>
      </Form.Item>
    </Form>
  )
}

const Index = React.memo(CreateRoom)
export default Index
