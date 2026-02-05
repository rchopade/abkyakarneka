export default async function handler(req, res) {
  try {
    const { history = [] } = req.body || {};

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
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
                "Generate 10 short fun ideas for when someone is bored. Return as a numbered list."
            }
          ],
          temperature: 1.2,
        }),
      }
    );

    const data = await openaiRes.json();

    if (!data.choices) {
      return res.status(500).json({ idea: "AI error. Try again." });
    }

    let text = data.choices[0].message.content;

    let ideas = text
      .split("\n")
      .map((line) => line.replace(/^[0-9]+[.)-]?\s*/, "").trim())
      .filter(Boolean);

    let newIdeas = ideas.filter((i) => !history.includes(i));
    if (newIdeas.length === 0) newIdeas = ideas;

    const idea = newIdeas[Math.floor(Math.random() * newIdeas.length)];

    res.status(200).json({ idea });

  } catch (err) {
    console.log(err);
    res.status(500).json({ idea: "Server error. Try again." });
  }
}
