import { UserAddOutlined } from '@ant-design/icons'
import { Button, Tabs, TabPaneProps } from 'antd'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import CreateUser from './CreateUser'
import UsersList from './UserList'
import AdminLayout from '@/app/layouts/admin/Layout'
import UserDetails from './UserDetails'
type TargetKey = React.MouseEvent | React.KeyboardEvent | string

export interface TabProp extends TabPaneProps {
  key: string
  label: string
}

const Users: React.FC = () => {
  const [activeKey, setActiveKey] = useState('')
  const [items, setItems] = useState<TabProp[]>([])
  const newTabIndex = useRef(0)

  // function to create new tab pane create new user
  const add2 = () => {
    const newActiveKey = `CreateUserTab-${newTabIndex.current++}`
    setItems([
      ...items,
      {
        key: newActiveKey,
        label: 'Create User',
        children: <CreateUser />
      }
    ])
    setActiveKey(newActiveKey)
  }
  // function to create new tab pane for user details
  const add = useCallback(
    (id: string) => {
      const newActiveKey = `DetailUserTab-${id}`

      setItems((prevItems) => {
        const updatedItems = [...prevItems]

        const existingTab = updatedItems.find((pane) => pane.key === newActiveKey)
        if (existingTab) {
          // Override the existing tab with the new content
          existingTab.children = <UserDetails id={id} />
        } else {
          // Add a new tab
          updatedItems.push({
            key: newActiveKey,
            label: 'User Details',
            children: <UserDetails id={id} />
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
        label: 'Users List',
        children: <UsersList add={add} />,
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
    <AdminLayout activeLink='users'>
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
            Create User
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
const Index = React.memo(Users)
export default Index
