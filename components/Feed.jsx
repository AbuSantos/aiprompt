'use client'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import PromptCard from './PromptCard'
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((prompt) => (
        <PromptCard
          prompt={prompt}
          key={prompt.id}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchtext, setSearchText] = useState('')
  const [filtedPrompts, setFilteredPrompts] = useState([])
  const [prompts, setPrompts] = useState([])

  const handleTextChange = (e) => {
    const newText = e.target.value
    debounceHandleText(newText)
    // setSearchText(newText)
    // const filtered = searchPrompts(prompts, newText)
    // setFilteredPrompts(filtered)
  }

  const debounceHandleText = debounce((newText) => {
    setSearchText(newText)
    const filtered = searchPrompts(prompts, newText)
    setFilteredPrompts(filtered)
  }, 400)
  
  const handleTagClick = (tag) => {
    const showTags = searchPrompts(prompts, tag)
    setFilteredPrompts(showTags)
  }
  useEffect(() => {
    const fecthPrompts = async () => {
      const res = await fetch('api/prompt')
      const data = await res.json()
      setPrompts(data)
      setFilteredPrompts(data)
    }
    fecthPrompts()
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
    <section className="feed">
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

      <PromptCardList data={filtedPrompts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed
