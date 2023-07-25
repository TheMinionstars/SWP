import { UserAddOutlined } from '@ant-design/icons'
import { Button, Tabs, TabPaneProps } from 'antd'

import React, { useEffect, useRef, useState, useCallback } from 'react'

import AdminLayout from '@/app/layouts/admin/Layout'

import BookingRoomList from './BookingRoomList'
import BookingRoomDetail from './BookingRoomDetail'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface TabProp extends TabPaneProps {
  key: string
  label: string
}

const BookingRooms: React.FC = () => {
  const [activeKey, setActiveKey] = useState('')
  const [items, setItems] = useState<TabProp[]>([])
  const newTabIndex = useRef(0)

  // function to create new tab pane for room details
  const add = useCallback(
    (id: string) => {
      const newActiveKey = `DetailBookingRoomTab-${id}`

      setItems((prevItems) => {
        const updatedItems = [...prevItems]

        const existingTab = updatedItems.find((pane) => pane.key === newActiveKey)
        if (existingTab) {
          // Override the existing tab with the new content
          existingTab.children = <BookingRoomDetail id={id} />
        } else {
          // Add a new tab
          updatedItems.push({
            key: newActiveKey,
            label: id,
            children: <BookingRoomDetail id={id} />
          })
        }

        return updatedItems
      })
      setActiveKey(newActiveKey)
    },
    [setItems, setActiveKey]
  )

  useEffect(() => {
    const defaultPanes: TabProp[] = [
      {
        key: '1',
        label: 'Booking Rooms',
        children: <BookingRoomList add={add} />,
        closable: false
      }
    ]
    setItems(defaultPanes)
    setActiveKey(defaultPanes[0].key)
  }, [setItems, setActiveKey, add])

  // function to removed a tab pane
  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey)
    const newPanes = items.filter((pane) => pane.key !== targetKey)
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
      setActiveKey(key)
    }
    setItems(newPanes)
  }

  // function to edit tab components
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey)
    }
  }
  return (
    <AdminLayout activeLink='booking-rooms'>
      <Tabs
        className='!h-full'
        onChange={(key) => setActiveKey(key)}
        activeKey={activeKey}
        type='editable-card'
        onEdit={onEdit}
        items={items}
        size='large'
        hideAdd
      />
    </AdminLayout>
  )
}
const Index = React.memo(BookingRooms)
export default Index
