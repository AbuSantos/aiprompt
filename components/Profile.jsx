import PromptCard from './PromptCard'

const Profile = ({ name, desc, handleEdit, handleDelete, data }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10  prompt_layout ">
        {data.map((prompt) => (
          console.log(prompt)
        //   <PromptCard
        //     prompt={prompt}
        //     key={prompt.id}
        //     handleEdit={() => handleEdit && handleEdit(prompt)}
        //     handleDelete={() => handleDelete && handleDelete(prompt)}
        //   />
        ))}
      </div>
    </section>
  )
}

export default Profile
