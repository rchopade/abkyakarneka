export default async function handler(req, res) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You generate fun short ideas when someone is bored. Respond with ONE short idea only."
        },
        {
          role: "user",
          content: "Give me a random fun idea"
        }
      ],
      temperature: 1
    }),
  });

  const data = await response.json();
  const idea = data.choices?.[0]?.message?.content || "Go stretch for 2 minutes";

  res.status(200).json({ idea });
}
