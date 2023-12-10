'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const UserProfile = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const [prompts, setPrompts] = useState([])
  console.log('router.query:', userId)
  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`api/users/${userId}/prompt`)
      const data = await res.json()

      setPrompts(data)
    }
    //we're fetching post only when we have the user id
    if (userId) fetchPrompts()
  }, [])

  return (
    <div>
      <div>
        <Profile name="My" desc="View all your prompts" data={prompts} />
      </div>
    </div>
  )
}

export default UserProfile
