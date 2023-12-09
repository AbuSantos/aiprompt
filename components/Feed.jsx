'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((prompt) => (
        <PromptCard prompt={prompt} />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchtext, setSearchText] = useState('')
  const [prompts, setPrompts] = useState([])
  const handleTextChange = (e) => {}

  useEffect(() => {
    const fecthPrompts = async () => {
      const res = await fetch('api/prompt')
      const data = await res.json()
      setPrompts(data)
    }
    fecthPrompts()
  }, [])

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

      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
