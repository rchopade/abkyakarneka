export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: "Give ONE short fun idea for when someone is bored. No numbering. Just the idea."
      }),
    });

    const data = await response.json();

    const idea = data.output[0].content[0].text;

    res.status(200).json({ idea });

  } catch (error) {
    console.log(error);
    res.status(500).json({ idea: "AI failed. Try again." });
  }
}
