'use client'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { Suspense } from 'react'
import PromptCard from './PromptCard'
import FeedSkeleton from './FeedSkeleton'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time)
  })

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((prompt) => (
        <Suspense fallback={<FeedSkeleton />}>
          <PromptCard
            prompt={prompt}
            key={prompt.id}
            handleTagClick={handleTagClick}
          />
        </Suspense>
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchtext, setSearchText] = useState('')
  const [filteredPrompts, setFilteredPrompts] = useState([])
  const [prompts, setPrompts] = useState([])
  const [loading, setLoading] = useState(true)

  const handleTextChange = (e) => {
    const newText = e.target.value
    debounceHandleText(newText)
  }

  const debounceHandleText = debounce((newText) => {
    setSearchText(newText)
    const filtered = searchPrompts(prompts, newText)
    setFilteredPrompts(filtered)
  }, 200)

  const handleTagClick = (tag) => {
    debounceHandleText(tag)
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      await delay(1000)
      const res = await fetch('api/prompt')
      const data = await res.json()
      setPrompts(data)
      setFilteredPrompts(data)
      setLoading(false)
    }
    fetchPrompts()
  }, [])

  const searchPrompts = (prompts, searchText) => {
    const escapedSearchText = searchText.replace(
      /[-/\\^$*+?.()|[\]{}]/g,
      '\\$&',
    )
    const regexPattern = new RegExp(
      escapedSearchText.split(/\s+/).join('|'),
      'i',
    )
    return prompts.filter((prompt) => regexPattern.test(prompt.prompt))
  }

  return (
    <section className="fexed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search..."
          value={searchtext}
          onChange={handleTextChange}
          required
          className="search_input peer outline-none"
        />
      </form>
      <PromptCardList data={filteredPrompts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed
