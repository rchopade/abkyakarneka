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
            "Generate 10 SHORT fun ideas for when someone is bored. Return as a numbered list."
        }
      ],
      temperature: 1.2
    }),
  });

  const data = await response.json();
  let text = data.choices?.[0]?.message?.content || "";

  // Convert numbered list → array
  let ideas = text
    .split("\n")
    .map(line => line.replace(/^[0-9]+[.)-]?\s*/, "").trim())
    .filter(Boolean);

  // Remove already used ideas
  let newIdeas = ideas.filter(i => !history.includes(i));

  // If all ideas were used, reset history automatically
  if (newIdeas.length === 0) {
    newIdeas = ideas;
  }

  // Pick random unused idea
  const idea = newIdeas[Math.floor(Math.random() * newIdeas.length)];

  res.status(200).json({ idea });
}
