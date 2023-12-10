'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const UserProfile = () => {
    const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter()
  const { data: session } = useSession()
  const [prompts, setPrompts] = useState([])
  const { userId } = router.query

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`api/users/${userId}/prompt`)
      const data = await res.json()

      setPrompts(data)
    }
    //we're fetching post only when we have the user id
    if (session?.user.id) fetchPrompts()
  }, [userId])
  console.log('1 API Response:', prompts)

  return <div>[userId]</div>
}

export default UserProfile
