import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_KEY } from '../utils/config'
import useAuth from '../hooks/useAuth'

interface IProps {
  children: JSX.Element
}

export default function GuestGuard({ children }: IProps) {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()

  let token: string | null = null
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
  }

  useEffect(() => {
    if (isAuthenticated || token) {
      navigate('/')
    }
  }, [isAuthenticated, navigate, token])

  return children
}
