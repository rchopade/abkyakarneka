export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You generate fun, unique, non-repeating ideas of things people can do when bored. Always give a new idea."
          },
          {
            role: "user",
            content: "Give one random fun idea."
          }
        ],
        temperature: 1.2
      })
    });

    const data = await response.json();

    res.status(200).json({
      idea: data.choices[0].message.content
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "OpenAI call failed" });
  }
}
