import { configureStore, combineReducers } from '@reduxjs/toolkit'

import logger from 'redux-logger'
import { batchedSubscribe } from 'redux-batched-subscribe'

import { debounce } from 'lodash'
import storage from 'redux-persist/lib/storage'
import { PersistConfig, PersistState, persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import accountReducer, { AccountState } from './slices/accountSlice'
import appReducer, { AppState } from './slices/appSlice'

const debounceNotify = debounce((notify: any) => notify())

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  blacklist: []
}

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    account: accountReducer,
    app: appReducer
  })
)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [batchedSubscribe(debounceNotify)]
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
export type RootState = {
  account: AccountState
  app: AppState
  _persist: PersistState
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
