import Link from 'next/link'
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing ai prompts with the world to increase
        productivity and be respectful.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi, font-semibold text-base text-gray-700">
            Your ai prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="write your prompt"
            className="form_textarea"
            required
          />
        </label>
        <label>
          <span className="font-satoshi, font-semibold text-base text-gray-700">
            Tag
            <span className="font-normal text-sm">
              {' '}
              (#webdev, #scripts #businessIdea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="add a #tag"
            className="form_input outline-none"
            required
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 text-sm bg-primary-orange text-gray-100 rounded-full"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
