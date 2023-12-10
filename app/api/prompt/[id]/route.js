// We've to get the propmt
import Prompt from "@models/Prompt";
import { connectDB } from "@utils/database";

export const GET = async ({ params }) => {
  try {
    await connectDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Found no prompt with that Id", { status: 500 });
  }
};
// then update it
// or delete it
