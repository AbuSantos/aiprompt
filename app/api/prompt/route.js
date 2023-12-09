import Prompt from "@models/Prompt";
import { connectDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDB();

    //so we know who created it
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
