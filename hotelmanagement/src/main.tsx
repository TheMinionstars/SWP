import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store, persistor } from './app/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import LoadApp from './app/LoadApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <LoadApp />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
