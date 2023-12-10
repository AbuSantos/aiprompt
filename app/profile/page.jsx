'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const { data: session } = useSession()
  const handleEdit = () => {
    
  }
  const handleDelete = () => {
    console.log('hello world')
  }
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`api/users/${session?.user.id}/prompt`)
      const data = await res.json()

      setPrompts(data)
    }
    //we're fetching post only when we have the user id
    if (session?.user.id) fetchPrompts()
  }, [])
  console.log('1 API Response:', prompts)

  return (
    <div>
      <Profile
        name="My"
        desc="View all your prompts"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default ProfilePage
