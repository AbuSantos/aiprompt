'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const handleEdit = (prompt) => {
    router.push(`/updatePrompt?id=${prompt._id}`)
  }
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm('Are you sure you want to delete')
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${prompt._id.toString()}`, {
          method: 'DELETE',
        })
        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id)
        setPrompts(filteredPrompts)
      } catch (error) {
        console.log(error)
      }
    }
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
