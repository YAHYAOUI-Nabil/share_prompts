import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Prompt not found", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();

    const promptIsExist = await Prompt.findById(params.id);

    if (!promptIsExist) {
      return new Response("Prompt does not exist.", { status: 404 });
    }

    promptIsExist.prompt = prompt;
    promptIsExist.tag = tag;

    await promptIsExist.save();

    return new Response("Prompt updated successfully.", { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt.", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully.", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt.", { status: 500 });
  }
};
