'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PromptCard = ({ prompt, handleDelete, handleEdit, handleTagClick }) => {
  const [copied, setCopied] = useState('')
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  function capitalizeFirstLetter(string) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  function capitalizeFirstPost(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function truncateStringWithDotCom(str, maxLength) {
    // Check if the string length is greater than the maxLength
    if (str.length > maxLength) {
      // Truncate the string and add ellipsis
      return str.substring(0, maxLength - 4) + '...com'
    } else {
      // If the string is already within the maxLength, return it as is
      return str
    }
  }

  const handleCopy = () => {
    setCopied(prompt.prompt)
    // write the contents ton the copy
    navigator.clipboard.writeText(prompt.prompt)
    // reset the cop image after 3 seconds
    setTimeout(() => setCopied(''), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5 items-center">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start"
          onClick={() => router.push(`/user?id=${prompt.creator._id}`)}
        >
          <img
            src={prompt.creator?.image}
            alt="creator image"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className=" text-gray-800 ml-4 font-bold font-satoshi">
              {capitalizeFirstLetter(prompt.creator.username)}
            </h3>
            <p className="text-sm text-gray-500 ml-4 truncate">
              {truncateStringWithDotCom(prompt.creator.email, 5)}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <img
            src={
              copied === prompt.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={15}
            height={15}
            alt="copy "
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {capitalizeFirstPost(prompt.prompt)}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        #{prompt.tag}
      </p>
      {session?.user.id === prompt.creator._id && pathName === '/profile' && (
        <div className="mt-4 flex-center gap-4 border-t border-gray-100 p-3">
          <p
            className="cursor-pointer green_gradient font-inter"
            onClick={handleEdit}
          >
            edit
          </p>
          <p
            className="cursor-pointer orange_gradient font-inter"
            onClick={handleDelete}
          >
            delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
