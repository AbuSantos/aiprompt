// We've to get the propmt
import Prompt from "@models/Prompt";
import { connectDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response("Found not prompt with that Id", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch", { status: 500 });
  }
};
// then update it
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    //we connect to db
    await connectDB();
    //find the prompt
    const existingPrompt = await Prompt.findById(params.id);
    //check if we've the prompt
    if (!existingPrompt)
      return new Response("Found not prompt with that Id", { status: 404 });

    //pass the new prompt
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    //then we save the new prompt
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 200 });
  }
};

// or delete it
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully ", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 200 });
  }
};
