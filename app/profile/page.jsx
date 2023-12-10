'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const { data: session } = useSession()
  const handleEdit = () => {}
  const handleDelete = () => {}
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const fecthPrompts = async () => {
      const res = await fetch(`api/prompt/${session?.user.id}/prompts`)
      const data = await res.json()
      setPrompts(data)
    }
    //we're fetching post only when we have the user id
    if (session?.user.id) fecthPrompts()
  }, [])

  return (
    <div>
      <Profile
        name="My"
        desc=" Welcome to your profile!"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default ProfilePage
