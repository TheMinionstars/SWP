import { SmileOutlined } from '@ant-design/icons'

interface Service {
  icon: React.ComponentType
  title: string
  info: string
}

const services: Service[] = [
  {
    icon: SmileOutlined,
    title: 'free cocktails',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est eaque error provident unde eligendi.'
  },
  {
    icon: SmileOutlined,
    title: 'endless hiking',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est eaque error provident unde eligendi.'
  },
  {
    icon: SmileOutlined,
    title: 'free shuttle',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est eaque error provident unde eligendi.'
  },
  {
    icon: SmileOutlined,
    title: 'storages beer',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est eaque error provident unde eligendi.'
  }
]

export default services
