import { ConfigProvider, App, theme as antTheme } from 'antd'
import { useAppSelector } from './hooks/reduxHooks'
import { StyleProvider } from '@ant-design/cssinjs'

import locale from 'antd/locale/vi_VN'
import MyApp from '@app/App'

function LoadApp() {
  const { theme } = useAppSelector((state) => state.app)
  const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = antTheme
  return (
    <ConfigProvider theme={{ token: theme, algorithm: [defaultAlgorithm] }} locale={locale}>
      <StyleProvider hashPriority='high'>
        <App>
          <MyApp />
        </App>
      </StyleProvider>
    </ConfigProvider>
  )
}
export default LoadApp
