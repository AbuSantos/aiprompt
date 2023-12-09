import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  //creating the object type of the creator in the database
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", //the user can create many prompts --1-many
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },
  tag: {
    type: String,
    required: [true, "Prompt is required"],
  },
});
//we check if a model prompt, already existed, if not we create a model based on the prompt schema defined above
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
