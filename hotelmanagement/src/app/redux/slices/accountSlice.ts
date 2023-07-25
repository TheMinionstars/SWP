/* eslint-disable @typescript-eslint/no-empty-function */
import { JwtResponse, LoginPayload } from '@/app/data/auth'
import axiosClient from '@/app/utils/api/axiosClient'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NotificationInstance } from 'antd/es/notification/interface'
import { NavigateFunction } from 'react-router-dom'
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from '@app/utils/LocalStorage'

export interface AccountState {
  isLogin: boolean
  error: any
  isLoading: boolean
  userInfo: JwtResponse | null
}

export interface LoginAction {
  notification?: NotificationInstance
  navigate?: NavigateFunction
  payload: LoginPayload
}

// Define your async thunk action
export const loginAsync = createAsyncThunk<JwtResponse, LoginAction>(
  'account/login',
  async (data, { fulfillWithValue, rejectWithValue }) => {
    const { notification, navigate, payload } = data
    try {
      const res: JwtResponse = await axiosClient.post('/signIn', payload)

      // save token vào localstogare
      LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, res.accessToken)

      if (res.role === 'ROLE_Customer') {
        notification?.success({ message: 'Welcome to FBT Hotel' })
        navigate && navigate('/')
      } else if (res.role === 'ROLE_Admin') {
        navigate && navigate('/admin/dashboard')
        notification?.success({ message: `Welcome ${res.email}` })
      } else if (res.role === 'ROLE_Staff') {
        navigate && navigate('/staff/dasboard')
        notification?.success({ message: `Welcome ${res.email}` })
      }
      return fulfillWithValue(res)
    } catch (error) {
      // Sử dụng notification ở đây
      notification?.error({ message: 'Login failed' })
      return rejectWithValue(error)
    }
  }
)

const initialState: AccountState = {
  isLogin: false,
  error: null,
  isLoading: false,
  userInfo: null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false
      state.error = null
      state.isLoading = false
      state.userInfo = null
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLogin = true
        state.userInfo = action.payload
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
        state.isLogin = false
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isLogin = false
        state.error = action.payload
      })
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  }
})

// Action creators are generated for each case reducer function
export const { logout } = accountSlice.actions

export default accountSlice.reducer
