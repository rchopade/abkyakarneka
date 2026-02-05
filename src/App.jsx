// src/App.jsx
import { useState } from "react";

export default function App() {
  const [idea, setIdea] = useState("Click the button to get an AI idea ✨");
  const [loading, setLoading] = useState(false);

  async function generateIdea() {
    setLoading(true);
    try {
      const res = await fetch("/api/idea");
      const data = await res.json();
      setIdea(data.idea);
    } catch (err) {
      setIdea("Error getting idea 😢");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Ab Kya Karne Ka?</h1>

        <div className="bg-gray-100 rounded-2xl p-6 mb-6 min-h-[120px] flex items-center justify-center">
          <p className="text-2xl font-semibold text-gray-900">{loading ? "Thinking... 🤖" : idea}</p>
        </div>

        <button
          onClick={generateIdea}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
        >
          Give me an AI idea ✨
        </button>
      </div>
    </div>
  );
}

/*
Create a NEW file at: /api/idea.js (at project root, not inside src)
Paste this code there:

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
        { role: "system", content: "You generate fun short ideas when someone is bored. Respond with ONE short idea only." },
        { role: "user", content: "Give me a random fun idea" }
      ],
      temperature: 1
    }),
  });

  const data = await response.json();
  const idea = data.choices?.[0]?.message?.content || "Go stretch for 2 minutes";

  res.status(200).json({ idea });
}
*/