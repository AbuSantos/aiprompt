import Prompt from "@models/Prompt";
import { connectDB } from "@utils/database";

//params are populated when we pass dynamic variables in the api url
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
