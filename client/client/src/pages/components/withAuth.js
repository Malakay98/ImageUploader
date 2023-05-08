import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/login')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return AuthComponent
}

export default withAuth;