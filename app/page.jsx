import Feed from '@components/Feed'

function page() {
  return (
    <section className="w-full  flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br className="md:hidden " />
        <span className="orange_gradient text-center"> Ai powered prompts</span>
      </h1>
      <p className="desc text-center">
        aiPrompts is an open-source AI prompting tool for modern world to
        discorver, create and share creative prompts
      </p>
      <Feed />
    </section>
  )
}

export default page
