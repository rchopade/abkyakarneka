export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: "Give one short fun useful activity idea when someone is bored. Only one sentence."
      })
    })

    const data = await response.json()

    const idea = data.output?.[0]?.content?.[0]?.text

    res.status(200).json({ idea })
  } catch (error) {
    res.status(200).json({ idea: null })
  }
}
