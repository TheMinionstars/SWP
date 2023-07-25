import axios from 'axios'
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from '../LocalStorage'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
})
axiosClient.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customHeader: any = {}
    // const accessToken = LocalStorageUtils.getItem<RootState>(LOCAL_STORAGE_KEY.APP)?.account.userInfo?.accessToken
    const accessToken = LocalStorageUtils.getItem<string>(LOCAL_STORAGE_KEY.JWT)
    if (accessToken) {
      customHeader.Authorization = `Bearer ${accessToken}`
    }
    return {
      ...config,
      headers: {
        ...customHeader,
        ...config.headers
      }
    }
  },
  (error) => Promise.reject(error)
)
axiosClient.interceptors.response.use(
  (response) => {
    /**
     * Add logic for successful response
     */
    console.log(response)
    return response?.data || {}
  },
  async (error) => {
    /**
     * Add logic for any error from backend
     */
    // // Kiểm tra nếu mã trạng thái là 401 (Unauthorized)
    // if (error.response && error.response.status === 401) {
    //   const refreshToken = localStorage.getItem('refreshToken')
    //   if (refreshToken) {
    //     try {
    //       // Gọi API để làm mới mã thông báo
    //       const response = await axiosClient.post('/refresh-token', {
    //         refreshToken
    //       })
    //       const { accessToken, newRefreshToken } = response.data

    //       // Cập nhật mã thông báo mới trong localStorage
    //       localStorage.setItem('accessToken', accessToken)
    //       localStorage.setItem('refreshToken', newRefreshToken)

    //       // Thử gửi lại request ban đầu với mã thông báo mới
    //       error.config.headers.Authorization = `Bearer ${accessToken}`
    //       return axiosClient.request(error.config)
    //     } catch (refreshError) {
    //       // Xử lý lỗi khi làm mới mã thông báo
    //       // Ví dụ: Đăng xuất người dùng, đưa người dùng đến trang đăng nhập, vv.
    //       console.error('Failed to refresh token:', refreshError)
    //     }
    //   } else {
    //     // Xử lý khi không tìm thấy mã thông báo làm mới
    //     // Ví dụ: Đăng xuất người dùng, đưa người dùng đến trang đăng nhập, vv.
    //     console.error('Refresh token not found')
    //   }
    // }
    if (error.response && error.response.data.message) {
      return Promise.reject(error.response.data.message)
    } else if (error.message) {
      return Promise.reject(error.message)
    } else {
      console.log(error)
      return Promise.reject('Có lỗi bất ngờ xảy ra !!!')
    }
    // return Promise.reject(error)
  }
)
export default axiosClient
