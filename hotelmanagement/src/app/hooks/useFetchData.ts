import { useEffect, useState } from 'react'

import axiosClient from '../utils/api/axiosClient'
import { useAppSelector } from './reduxHooks'

const useFetchData = (url: string, fetchAgain?: boolean) => {
  const reFetch = useAppSelector((state) => state.app.reFetch)
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    axiosClient
      .get(url)
      .then((res: any) => {
        setLoading(false)
        if (res) {
          setResponse(res)
        } else {
          setError('Sorry! Something went wrong. App server error')
        }
      })
      .catch((err) => {
        setError(err || 'Sorry! Something went wrong. App server error')
        setLoading(false)
      })
  }, [url, fetchAgain, reFetch])

  return [loading, error, response]
}

export default useFetchData
