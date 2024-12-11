'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/login')
      }
    }, [status, router])

    if (status === 'loading') {
      return <div>Loading...</div>
    }

    if (status === 'authenticated') {
      return <WrappedComponent {...props} />
    }

    return null
  }
}

