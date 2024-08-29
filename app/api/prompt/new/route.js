import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();
    const promptData = {
      creator: userId,
      prompt,
      tag,
    };
    const newPrompt = await Prompt.create(promptData);
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("failed to create a new prompt", { status: 500 });
  }
};
