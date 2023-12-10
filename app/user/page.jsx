'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const UserProfile = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const [prompts, setPrompts] = useState([])
  useEffect(() => {
    const fetchPrompts = async () => {
      if (userId) {
        const res = await fetch(`api/users/${userId}/prompt`)
        const data = await res.json()
        setPrompts(data)
      }
    }
    //we're fetching post only when we have the user id
    fetchPrompts()
  }, [])
  // console.log(prompts[0].creator?.username)
  function capitalizeFirstLetter(string) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return (
    <div>
      <div>
        <Profile
          name={`${prompts[0]?.creator?.username}'s`}
          desc={`View all ${prompts[0]?.creator?.username}'s prompts`}
          data={prompts}
        />
      </div>
    </div>
  )
}

export default UserProfile
