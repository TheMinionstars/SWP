import React from 'react'
import { Badge, Descriptions, Result, Skeleton, Typography } from 'antd'
const { Title } = Typography
type BookingDetailProps = {
  id: string
}
const BookingDetail: React.FC<BookingDetailProps> = ({ id }) => {
  const loading = false
  const error = null
  const response = {}
  return (
    <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
      {error ? (
        <Result title='Failed to fetch' subTitle={error} status='error' />
      ) : (
        <Descriptions
          title={
            <div className='flex flex-col-reverse gap-5 p-4 md:p-6 xl:p-9 !pb-0 xl:flex-row xl:justify-between'>
              <div className='flex flex-col gap-4 sm:flex-row xl:gap-9'>
                <div>
                  <h4 className='mb-4 text-2xl font-semibold text-black dark:text-white'>Roger Culhane</h4>
                  <p className='block'>
                    <span className='font-medium'>Email:</span> contact@example.com
                  </p>
                  <span className='mt-2 block'>
                    <span className='font-medium'>Address:</span> 2972 Westheimer Rd. Santa Ana.
                  </span>
                </div>
              </div>
              <h3 className='text-2xl font-semibold text-black dark:text-white'>Mã đặt phòng #15478</h3>
            </div>
          }
          bordered
        >
          <Descriptions.Item label='Product'>Cloud Database</Descriptions.Item>
          <Descriptions.Item label='Billing Mode'>Prepaid</Descriptions.Item>
          <Descriptions.Item label='Automatic Renewal'>YES</Descriptions.Item>
          <Descriptions.Item label='Order time'>2018-04-24 18:00:00</Descriptions.Item>
          <Descriptions.Item label='Usage Time' span={2}>
            2019-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label='Status' span={3}>
            <Badge text='Running' color='blue' />
          </Descriptions.Item>
          <Descriptions.Item label='Negotiated Amount'>$80.00</Descriptions.Item>
          <Descriptions.Item label='Discount'>$20.00</Descriptions.Item>
          <Descriptions.Item label='Official Receipts'>$60.00</Descriptions.Item>
          <Descriptions.Item label='Config Info'>
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1
            <br />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Skeleton>
  )
}

export default BookingDetail
