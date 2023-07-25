import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  timeZone: string
  isLoading: boolean
  reFetch: boolean
  theme: {
    colorPrimary: string
    colorPrimaryBg: string
  }
}
const initialState: AppState = {
  timeZone: '',
  isLoading: false,
  reFetch: false,
  theme: {
    colorPrimary: '#e28048',
    colorPrimaryBg: '#e6f7ff'
  }
}
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    reFetchData: (state) => {
      state.reFetch = !state.reFetch
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, reFetchData } = appSlice.actions

export default appSlice.reducer
