import Prompt from "@models/Prompt";
import { connectDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDB()

        //so we know who created it 
    const prompts = await Prompt.find({}).populate('creator')
  } catch (error) {
    console.log(error);
  }
};
