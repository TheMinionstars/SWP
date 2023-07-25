import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useFetchData from '@/app/hooks/useFetchData'
import { RoomDTO } from '@/app/data/room'
import {
  DatePicker,
  Result,
  Button,
  Divider,
  Affix,
  Radio,
  Skeleton,
  RadioChangeEvent,
  Empty,
  Form,
  Select,
  App
} from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import Box from '../../shared/Box'
import Star from '../../shared/Star'
import { Feedback } from '@/app/data/feedback'
import { BookingDTO, ServiceDTO } from '@/app/data/transaction'
import dayjs from 'dayjs'
import { useAppSelector } from '@/app/hooks/reduxHooks'
import { RootState } from '@/app/redux/store'
import axiosClient from '@/app/utils/api/axiosClient'
import { AccountDTO } from '@/app/data/account'
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf('day')
}
const renderStar = (rating: number) => {
  return [...new Array(5)].map((arr, index) => {
    if (index + 1 <= rating) {
      return <Star fill={true} key={index} />
    } else {
      return <Star fill={false} key={index} />
    }
  })
}

const { RangePicker } = DatePicker

const default_services: ServiceDTO[] = [
  { serviceId: 1, name: 'Service 1', description: 'Description 1', price: 100000 },
  { serviceId: 2, name: 'Service 2', description: 'Description 2', price: 200000 },
  { serviceId: 3, name: 'Service 3', description: 'Description 3', price: 300000 },
  { serviceId: 4, name: 'Service 4', description: 'Description 4', price: 400000 }
]
const default_room: RoomDTO = {
  roomId: 1,
  name: 'Room 1',
  roomCategoryDTO: {
    id: 1,
    name: 'Category 1',
    amount: 10,
    description: 'Description 1'
  },
  image: '/images/jpeg/room-1.jpeg',
  price: 500000,
  isRent: false
}
const BookingContainer: React.FC = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.account)
  // handle booking
  const [loading, setLoading] = useState(false)

  // use for container
  const { slug, id } = useParams()
  const [value, setValue] = useState(1)
  const { notification, message } = App.useApp()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [servicePrice, setServicePrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  // fetch data
  const [roomLoading, roomError, roomResponse] = useFetchData(`/room/${id}`)
  const [feedbackLoading, feedbackError, feedbackResponse] = useFetchData(`/feedbackByRoom/${id}`)
  const [servicesLoading, servicesError, servicesResponse] = useFetchData(`/services`)
  const [userLoading, userError, userResponse] = useFetchData(`/account/${userInfo?.userId}`)

  const user: AccountDTO = userResponse && userResponse
  const room: RoomDTO = roomResponse ? roomResponse : default_room
  const feedbacks: Feedback[] = feedbackResponse ? feedbackResponse : []
  const services: ServiceDTO[] = servicesResponse ? servicesResponse : default_services
  const rating = Math.round(feedbacks.reduce((total: number, item) => total + item.rating, 0) / feedbacks.length)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const onChangeInRow = (v: number) => {
    form.setFieldsValue({
      payment: v
    })
  }
  const handleServiceChange = (selectedServices: string[]) => {
    const selectedServicePrices = selectedServices.map((serviceId) => {
      const selectedService = services.find((service) => service.serviceId.toString() === serviceId)
      return selectedService ? selectedService.price : 0
    })

    const newTotalPrice = selectedServicePrices.reduce((acc, price) => acc + price, 0)
    setServicePrice(newTotalPrice)
  }
  const onFinish = (values: any) => {
    setLoading(true)
    const payload: BookingDTO = {
      serviceDTOList: services.filter((service) => values.services.includes(service.serviceId.toString())),
      checkinDate: values.checkIO[0].format('YYYY-MM-DD HH:mm:ss'),
      checkoutDate: values.checkIO[1].format('YYYY-MM-DD HH:mm:ss'),
      accountId: user,
      status: 'pending',
      roomDTOList: [room],
      totalPrice: totalPrice
    }
    console.log(payload)
    axiosClient
      .post('/booking', payload)
      .then((response) => {
        setLoading(false)
        if (response) {
          notification.success({ message: 'Your booking successful' })
          // form.resetFields()
          navigate('/me?tab=booking-history')
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
  const validateCheckIO = (rule: any, value: any) => {
    if (!value || value.length <= 1 || value[0].startOf('day') < value[1].startOf('day')) {
      return Promise.resolve()
    } else {
      return Promise.reject('Please enter a valid checkIn and CheckOut!')
    }
  }

  useEffect(() => {
    setTotalPrice(servicePrice + room.price)
  }, [room.price, servicePrice])

  return (
    <div>
      {roomError || userError ? (
        <Result title='Failed to fetch' subTitle={roomError || userError} status='error' />
      ) : (
        <Skeleton className='w-full' loading={roomLoading || userLoading} paragraph={{ rows: 10 }} active>
          <Form
            form={form}
            layout='vertical'
            name='registerForm'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            initialValues={{ payment: 1 }}
          >
            <div className='w-full flex flex-wrap mt-5'>
              <div className=' w-full md:w-6/12 lg:w-7/12 md:pr-5'>
                <div className='px-0 space-y-5'>
                  <div>
                    <div className='flex'>
                      <div className='ml-5 '>
                        <h1 className='m-0 text-2xl font-bold capitalize'>{room ? room.name : 'Default name'}</h1>
                        <div className='mt-1 flex flex-wrap items-center'>
                          <div className='flex items-center'>{renderStar(rating)}</div>
                          <p className='m-0 ml-2 text-sm font-normal'>({feedbacks.length} đánh giá)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-start'>
                      <img
                        src={`${room ? room.image : '/images/jpeg/room-1.jpeg'}`}
                        className='rounded-md shadow'
                        alt=''
                      />
                    </div>
                  </div>

                  <div className=' block md:hidden'>
                    <Box title='Thông tin phòng'>
                      <div className='px-7 sm:px-10 pt-6 pb-10'>
                        <div className='row'>
                          <span className='font-bold'>Phòng {room && room.name}</span>
                          <span className='text-right'>
                            {room
                              ? room.price.toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                })
                              : Number(0).toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                })}
                          </span>
                        </div>
                        <div className='row'>
                          <span className='font-bold'>Loại phòng</span>
                          <span className='text-right'>{room ? room.roomCategoryDTO.name : 'Default category'}</span>
                        </div>
                        {room && room.roomCategoryDTO?.description && (
                          <div className='row'>
                            <span className='font-bold'>Mô tả</span>
                            <span className='text-right'>{room?.roomCategoryDTO?.description}</span>
                          </div>
                        )}
                      </div>
                    </Box>
                  </div>
                  <div>
                    <Box title='Yêu cầu'>
                      <div className='px-7 sm:px-10 pt-6 pb-10'>
                        <Form.Item className='w-full' label='Dịch vụ' name='services'>
                          <Select
                            mode='multiple'
                            placeholder='-- Select Service --'
                            optionFilterProp='children'
                            options={services.map((service) => ({
                              value: service.serviceId.toString(),
                              label: service.name
                            }))}
                            size='large'
                            allowClear
                            onChange={handleServiceChange}
                          />
                        </Form.Item>
                        <Form.Item
                          className='w-full'
                          label='Ngày nhận phòng - trả phòng'
                          name='checkIO'
                          rules={[
                            { required: true, message: 'Please select your checkIn and checkOut!' },
                            { validator: validateCheckIO }
                          ]}
                        >
                          {/* <DatePicker className='w-full' format={'DD/MM/YYYY'} disabledDate={disabledDate} /> */}
                          <RangePicker className='w-full' format={'DD/MM/YYYY'} disabledDate={disabledDate} />
                        </Form.Item>
                      </div>
                    </Box>
                  </div>
                  <div className='hidden md:block'>
                    <div className='box'>
                      <Form.Item
                        className='w-full'
                        label={<p className='text-lg font-bold'>Phương thức thanh toán</p>}
                        name='payment'
                        rules={[
                          {
                            required: true,
                            message: 'Please select your Payment!'
                          }
                        ]}
                      >
                        <Radio.Group className='w-full'>
                          <div className='row cursor-pointer' onClick={() => onChangeInRow(1)}>
                            <div className='flex items-center'>
                              <svg width='32' height='32' fill='none'>
                                <path
                                  d='M4 13.5l.5-6 2-1H19l3 1 .5 3V12H11l-1.5 2-.5 6-4.5-1-.5-5.5z'
                                  fill='url(#icon_method_bank_transfer_svg__paint0_linear)'
                                ></path>
                                <path
                                  d='M25.333 12H12a2.667 2.667 0 00-2.667 2.667v8A2.667 2.667 0 0012 25.333h13.333A2.667 2.667 0 0028 22.667v-8A2.667 2.667 0 0025.333 12z'
                                  fill='#fff'
                                  stroke='#2D3748'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></path>
                                <path
                                  d='M18.667 21.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zM22.667 12V9.333A2.667 2.667 0 0020 6.667H6.667A2.667 2.667 0 004 9.333v8A2.667 2.667 0 006.667 20h2.666'
                                  stroke='#2D3748'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></path>
                                <defs>
                                  <linearGradient
                                    id='icon_method_bank_transfer_svg__paint0_linear'
                                    x1='13.25'
                                    y1='6.5'
                                    x2='13.25'
                                    y2='20'
                                    gradientUnits='userSpaceOnUse'
                                  >
                                    <stop stopColor='#E2E8F0'></stop>
                                    <stop offset='1' stopColor='#CBD5E0'></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <p className='ml-[12px]'>Trả tiền mặt</p>
                            </div>
                            <Radio value={3} />
                          </div>
                          <div className='row cursor-pointer' onClick={() => onChangeInRow(2)}>
                            <div className='flex items-center'>
                              <svg width='32' height='32' fill='none'>
                                <path
                                  d='M4 13.5l.5-6 2-1H19l3 1 .5 3V12H11l-1.5 2-.5 6-4.5-1-.5-5.5z'
                                  fill='url(#icon_method_bank_transfer_svg__paint0_linear)'
                                ></path>
                                <path
                                  d='M25.333 12H12a2.667 2.667 0 00-2.667 2.667v8A2.667 2.667 0 0012 25.333h13.333A2.667 2.667 0 0028 22.667v-8A2.667 2.667 0 0025.333 12z'
                                  fill='#fff'
                                  stroke='#2D3748'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></path>
                                <path
                                  d='M18.667 21.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zM22.667 12V9.333A2.667 2.667 0 0020 6.667H6.667A2.667 2.667 0 004 9.333v8A2.667 2.667 0 006.667 20h2.666'
                                  stroke='#2D3748'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></path>
                                <defs>
                                  <linearGradient
                                    id='icon_method_bank_transfer_svg__paint0_linear'
                                    x1='13.25'
                                    y1='6.5'
                                    x2='13.25'
                                    y2='20'
                                    gradientUnits='userSpaceOnUse'
                                  >
                                    <stop stopColor='#E2E8F0'></stop>
                                    <stop offset='1' stopColor='#CBD5E0'></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <p className='ml-[12px]'>Visa Card</p>
                            </div>
                            <Radio value={1} />
                          </div>
                          <div className='row cursor-pointer' onClick={() => onChangeInRow(2)}>
                            <div className='flex items-center'>
                              <svg width='32' height='32' fill='none'>
                                <path
                                  d='M4 13.5l.5-6 2-1H19l3 1 .5 3V12H11l-1.5 2-.5 6-4.5-1-.5-5.5z'
                                  fill='url(#icon_method_bank_transfer_svg__paint0_linear)'
                                ></path>
                                <path
                                  d='M25.333 12H12a2.667 2.667 0 00-2.667 2.667v8A2.667 2.667 0 0012 25.333h13.333A2.667 2.667 0 0028 22.667v-8A2.667 2.667 0 0025.333 12z'
                                  fill='#fff'
                                  stroke='#2D3748'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></path>
                                <path
                                  d='M18.667 21.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zM22.667 12V9.333A2.667 2.667 0 0020 6.667H6.667A2.667 2.667 0 004 9.333v8A2.667 2.667 0 006.667 20h2.666'
                                  stroke='#2D3748'
                                  strokeWidth='1.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></path>
                                <defs>
                                  <linearGradient
                                    id='icon_method_bank_transfer_svg__paint0_linear'
                                    x1='13.25'
                                    y1='6.5'
                                    x2='13.25'
                                    y2='20'
                                    gradientUnits='userSpaceOnUse'
                                  >
                                    <stop stopColor='#E2E8F0'></stop>
                                    <stop offset='1' stopColor='#CBD5E0'></stop>
                                  </linearGradient>
                                </defs>
                              </svg>
                              <p className='ml-[12px]'>Master Card</p>
                            </div>
                            <Radio value={2} />
                          </div>
                        </Radio.Group>
                      </Form.Item>

                      <div className='flex items-end flex-col'>
                        <Form.Item className='w-auto m-[12px_0px]'>
                          <Button
                            loading={loading}
                            disabled={loading}
                            type='primary'
                            htmlType='submit'
                            size='large'
                            className='w-auto '
                          >
                            Thanh toán
                          </Button>
                        </Form.Item>

                        <p>
                          Bằng cách nhấn vào nút này, bạn công nhận mình đã đọc và đồng ý với Điều kiện và Điều khoản
                          của chúng tôi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5 block md:hidden w-full space-y-5'>
                  <Box title='Chi tiết giá'>
                    <div className='px-7 sm:px-10 pt-6 pb-10'>
                      <div className='row'>
                        <span className='font-bold capitalize'>2 phòng</span>
                        <span className='text-right'>
                          {room
                            ? room.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })
                            : Number(0).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })}
                        </span>
                      </div>
                      <div className='row' style={{ borderBottom: '4px solid rgb(237, 242, 247)' }}>
                        <span className='font-bold capitalize'>Dịch vụ thêm</span>
                        <span className='text-right'>
                          {servicePrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </span>
                      </div>
                      <div className='row !border-0'>
                        <span className='font-bold capitalize '>Tổng tiền thanh toán</span>
                        <span className='text-right text-[18px]'>
                          {totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </span>
                      </div>
                    </div>
                  </Box>
                  <div className='box'>
                    <Form.Item
                      className='w-full'
                      label={<p className='text-lg font-bold'>Phương thức thanh toán</p>}
                      name='payment'
                      rules={[
                        {
                          required: true,
                          message: 'Please select your Payment!'
                        }
                      ]}
                    >
                      <Radio.Group className='w-full' onChange={onChange} value={value}>
                        <div className='row cursor-pointer' onClick={() => onChangeInRow(1)}>
                          <div className='flex items-center'>
                            <svg width='32' height='32' fill='none'>
                              <path
                                d='M4 13.5l.5-6 2-1H19l3 1 .5 3V12H11l-1.5 2-.5 6-4.5-1-.5-5.5z'
                                fill='url(#icon_method_bank_transfer_svg__paint0_linear)'
                              ></path>
                              <path
                                d='M25.333 12H12a2.667 2.667 0 00-2.667 2.667v8A2.667 2.667 0 0012 25.333h13.333A2.667 2.667 0 0028 22.667v-8A2.667 2.667 0 0025.333 12z'
                                fill='#fff'
                                stroke='#2D3748'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              ></path>
                              <path
                                d='M18.667 21.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zM22.667 12V9.333A2.667 2.667 0 0020 6.667H6.667A2.667 2.667 0 004 9.333v8A2.667 2.667 0 006.667 20h2.666'
                                stroke='#2D3748'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              ></path>
                              <defs>
                                <linearGradient
                                  id='icon_method_bank_transfer_svg__paint0_linear'
                                  x1='13.25'
                                  y1='6.5'
                                  x2='13.25'
                                  y2='20'
                                  gradientUnits='userSpaceOnUse'
                                >
                                  <stop stopColor='#E2E8F0'></stop>
                                  <stop offset='1' stopColor='#CBD5E0'></stop>
                                </linearGradient>
                              </defs>
                            </svg>
                            <p className='ml-[12px]'>Trả tiền mặt</p>
                          </div>
                          <Radio value={3} />
                        </div>
                        <div className='row cursor-pointer' onClick={() => onChangeInRow(2)}>
                          <div className='flex items-center'>
                            <svg width='32' height='32' fill='none'>
                              <path
                                d='M4 13.5l.5-6 2-1H19l3 1 .5 3V12H11l-1.5 2-.5 6-4.5-1-.5-5.5z'
                                fill='url(#icon_method_bank_transfer_svg__paint0_linear)'
                              ></path>
                              <path
                                d='M25.333 12H12a2.667 2.667 0 00-2.667 2.667v8A2.667 2.667 0 0012 25.333h13.333A2.667 2.667 0 0028 22.667v-8A2.667 2.667 0 0025.333 12z'
                                fill='#fff'
                                stroke='#2D3748'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              ></path>
                              <path
                                d='M18.667 21.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zM22.667 12V9.333A2.667 2.667 0 0020 6.667H6.667A2.667 2.667 0 004 9.333v8A2.667 2.667 0 006.667 20h2.666'
                                stroke='#2D3748'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              ></path>
                              <defs>
                                <linearGradient
                                  id='icon_method_bank_transfer_svg__paint0_linear'
                                  x1='13.25'
                                  y1='6.5'
                                  x2='13.25'
                                  y2='20'
                                  gradientUnits='userSpaceOnUse'
                                >
                                  <stop stopColor='#E2E8F0'></stop>
                                  <stop offset='1' stopColor='#CBD5E0'></stop>
                                </linearGradient>
                              </defs>
                            </svg>
                            <p className='ml-[12px]'>Visa Card</p>
                          </div>
                          <Radio value={1} />
                        </div>
                        <div className='row cursor-pointer' onClick={() => onChangeInRow(2)}>
                          <div className='flex items-center'>
                            <svg width='32' height='32' fill='none'>
                              <path
                                d='M4 13.5l.5-6 2-1H19l3 1 .5 3V12H11l-1.5 2-.5 6-4.5-1-.5-5.5z'
                                fill='url(#icon_method_bank_transfer_svg__paint0_linear)'
                              ></path>
                              <path
                                d='M25.333 12H12a2.667 2.667 0 00-2.667 2.667v8A2.667 2.667 0 0012 25.333h13.333A2.667 2.667 0 0028 22.667v-8A2.667 2.667 0 0025.333 12z'
                                fill='#fff'
                                stroke='#2D3748'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              ></path>
                              <path
                                d='M18.667 21.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zM22.667 12V9.333A2.667 2.667 0 0020 6.667H6.667A2.667 2.667 0 004 9.333v8A2.667 2.667 0 006.667 20h2.666'
                                stroke='#2D3748'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              ></path>
                              <defs>
                                <linearGradient
                                  id='icon_method_bank_transfer_svg__paint0_linear'
                                  x1='13.25'
                                  y1='6.5'
                                  x2='13.25'
                                  y2='20'
                                  gradientUnits='userSpaceOnUse'
                                >
                                  <stop stopColor='#E2E8F0'></stop>
                                  <stop offset='1' stopColor='#CBD5E0'></stop>
                                </linearGradient>
                              </defs>
                            </svg>
                            <p className='ml-[12px]'>Master Card</p>
                          </div>
                          <Radio value={2} />
                        </div>
                      </Radio.Group>
                    </Form.Item>
                    <Affix offsetBottom={10} style={{ marginTop: '10px' }}>
                      <Form.Item className='w-full'>
                        <Button
                          loading={loading}
                          disabled={loading}
                          type='primary'
                          htmlType='submit'
                          size='large'
                          className='w-full'
                        >
                          Thanh toán
                        </Button>
                      </Form.Item>
                    </Affix>
                    <p className='mt-[12px]'>
                      Bằng cách nhấn vào nút này, bạn công nhận mình đã đọc và đồng ý với Điều kiện và Điều khoản của
                      chúng tôi
                    </p>
                  </div>
                </div>
                <Divider />
                <div className='px-0'>
                  <div className='mt-3 pb-8 border-b border-black border-opacity-10'>
                    <h5 className='m-0 font-medium text-xl'>Từ khoá</h5>
                    <div className='flex justify-start mt-3'>
                      <div className='mr-2 px-3 py-1 rounded bg-gray-200 font-medium capitalize'>
                        {room ? room.roomCategoryDTO.name : 'Default category'}
                      </div>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center'>
                      <h5 className='m-0 font-medium text-xl'>Đánh giá phòng</h5>
                      <div className='flex items-center'>
                        <div className='flex items-center sm:ml-3'>{renderStar(rating)}</div>
                        <p className='m-0 ml-2 text-sm font-normal'>({feedbacks.length} đánh giá)</p>
                      </div>
                    </div>
                    {feedbackError ? (
                      <Result title='Failed to fetch' subTitle={feedbackError} status='error' />
                    ) : (
                      <Skeleton loading={feedbackLoading} paragraph={{ rows: 10 }} active>
                        {feedbacks.length === 0 ? (
                          <Empty className='mt-10' description={<span>Sorry! Any data was not found.</span>} />
                        ) : (
                          <div className='mt-1.5 sm:pl-10'>
                            {feedbacks.map((feedback, index) => (
                              <div
                                key={index}
                                className={`w-full pt-5 mb-8 ${index > 1 && 'border-t border-black border-opacity-10'}`}
                              >
                                <div className='flex'>
                                  <div className='bg-[transparent] shrink-0 border border-black border-opacity-10 rounded-full h-10 w-10 flex items-center justify-center overflow-hidden'>
                                    <img
                                      alt=''
                                      src={'/default.jpg'}
                                      className='w-full h-full object-cover rounded-lg'
                                    />
                                  </div>
                                  <div className='flex flex-wrap justify-between items-center w-full ml-2'>
                                    <div className=''>
                                      <h4 className='m-0 font-semibold'>{feedback.accountName}</h4>
                                    </div>
                                    <div className='flex'>{renderStar(feedback.rating)}</div>
                                  </div>
                                </div>
                                <div className='mt-1.5'>
                                  <p className='m-0'>{feedback.comment}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </Skeleton>
                    )}
                  </div>
                </div>
              </div>
              <div className=' hidden md:block md:w-6/12 lg:w-5/12 '>
                <div className='w-full space-y-5'>
                  <Box title='Thông tin phòng'>
                    <div className='px-7 sm:px-10 pt-6 pb-10'>
                      <div className='row'>
                        <span className='font-bold'>Phòng {room && room.name}</span>
                        <span className='text-right'>
                          {room
                            ? room.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })
                            : Number(0).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })}
                        </span>
                      </div>
                      <div className='row'>
                        <span className='font-bold'>Loại phòng</span>
                        <span className='text-right'>{room ? room.roomCategoryDTO.name : 'Default category'}</span>
                      </div>
                      {room && room.roomCategoryDTO?.description && (
                        <div className='row'>
                          <span className='font-bold'>Mô tả</span>
                          <span className='text-right'>{room?.roomCategoryDTO?.description}</span>
                        </div>
                      )}
                    </div>
                  </Box>
                  <Affix offsetTop={100} onChange={(affixed) => console.log(affixed)} style={{ marginTop: '10px' }}>
                    <Box title='Chi tiết giá'>
                      <div className='px-7 sm:px-10 pt-6 pb-10'>
                        <div className='row'>
                          <span className='font-bold capitalize'>1 phòng</span>
                          <span className='text-right'>
                            {room
                              ? room.price.toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                })
                              : Number(0).toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                })}
                          </span>
                        </div>
                        <div className='row' style={{ borderBottom: '4px solid rgb(237, 242, 247)' }}>
                          <span className='font-bold capitalize'>Dịch vụ thêm</span>
                          <span className='text-right'>
                            {servicePrice.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </span>
                        </div>
                        <div className='row !border-0'>
                          <span className='font-bold capitalize '>Tổng tiền thanh toán</span>
                          <span className='text-right text-[18px]'>
                            {totalPrice.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </span>
                        </div>
                      </div>
                    </Box>
                  </Affix>
                </div>
              </div>
            </div>
          </Form>
        </Skeleton>
      )}
    </div>
  )
}

const Index = React.memo(BookingContainer)
export default Index
