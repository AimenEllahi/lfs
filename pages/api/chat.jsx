import { OpenAIStream } from "../../utils/OpenAIStream";

if (!process.env.NEXT_PUBLIC_OPENAI_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "I am an education counselor based in Pakistan with expertise in advising students about pursuing masters degrees in Germany. I have in-depth knowledge of the German higher education system, masters program options, university rankings, admission requirements, visa process, cost of study, scholarships, and post-study work opportunities in Germany. I specialize in assisting students from computer science or related technical backgrounds. I provide honest, ethical, and personalized guidance to help these students identify the best masters programs in Germany aligned with their academic background, interests, career goals, and budget. I answer all student questions and provide relevant information and recommendations in a friendly and clear manner.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  // return stream response (SSE)
  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
};

export default handler;
