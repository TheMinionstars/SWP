import { UserAddOutlined } from '@ant-design/icons'
import { Button, Tabs, TabPaneProps } from 'antd'

import React, { useEffect, useRef, useState, useCallback } from 'react'

import AdminLayout from '@/app/layouts/admin/Layout'
import CreateRoom from './CreateRoom'
import RoomsList from './RoomsList'
import RoomDetails from './RoomDetails'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface TabProp extends TabPaneProps {
  key: string
  label: string
}

const Rooms: React.FC = () => {
  const [activeKey, setActiveKey] = useState('')
  const [items, setItems] = useState<TabProp[]>([])
  const newTabIndex = useRef(0)

  // function to create new tab pane create new room
  const add2 = () => {
    const newActiveKey = `CreateRoomTab-${newTabIndex.current++}`
    setItems([
      ...items,
      {
        key: newActiveKey,
        label: 'Create Room',
        children: <CreateRoom />
      }
    ])
    setActiveKey(newActiveKey)
  }
  // function to create new tab pane for room details
  const add = useCallback(
    (id: string) => {
      const newActiveKey = `DetailRoomTab-${id}`

      setItems((prevItems) => {
        const updatedItems = [...prevItems]

        const existingTab = updatedItems.find((pane) => pane.key === newActiveKey)
        if (existingTab) {
          // Override the existing tab with the new content
          existingTab.children = <RoomDetails id={id} />
        } else {
          // Add a new tab
          updatedItems.push({
            key: newActiveKey,
            label: 'Room Details',
            children: <RoomDetails id={id} />
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
        label: 'Rooms List',
        children: <RoomsList add={add} />,
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
    } else {
      add2()
    }
  }
  return (
    <AdminLayout activeLink='hotel-rooms'>
      <Tabs
        onChange={(key) => setActiveKey(key)}
        tabBarExtraContent={
          <Button
            className='inline-flex items-center'
            icon={<UserAddOutlined />}
            onClick={add2}
            type='primary'
            size='large'
          >
            Create Room
          </Button>
        }
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
const Index = React.memo(Rooms)
export default Index
