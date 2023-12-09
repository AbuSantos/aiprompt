import Prompt from "@models/Prompt";
import { connectDB } from "@utils/database";

export const POST = async (req, res) => {
  //fecthing the data to be passed in from the form
  const { userId, prompt, tag } = await req.json();

  try {
    await connectDB(); //a lambda function:dies after connection
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Prompt", { status: 500 }); //status 500:server error
  }
};
