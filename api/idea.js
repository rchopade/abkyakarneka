export default async function handler(req, res) {
  const { history = [] } = req.body || {};

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
            "You generate fun short ideas when someone is bored. NEVER repeat any idea from the provided list."
        },
        {
          role: "user",
          content: `Give one short fun idea. Avoid these ideas: ${history.join(", ")}`
        }
      ],
      temperature: 1.2
    }),
  });

  const data = await response.json();
  const idea = data.choices?.[0]?.message?.content || "Do 10 jumping jacks";

  res.status(200).json({ idea });
}
