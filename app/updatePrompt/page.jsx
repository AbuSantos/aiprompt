'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Form from '@components/Form'

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter()

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    //we call this function only if the promptId is available
    if (promptId) getPromptDetails()
  }, [promptId])

  //cuntion that creates a prompt
  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const response = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={handleEdit}
      />
    </div>
  )
}

export default UpdatePrompt
