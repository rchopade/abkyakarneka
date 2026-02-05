import { useState, useEffect } from "react";

export default function App() {
  const [idea, setIdea] = useState("Click the button to get an AI idea ✨");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Load previous ideas from browser
  useEffect(() => {
    const saved = localStorage.getItem("ideaHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  async function generateIdea() {
    setLoading(true);
    try {
      const res = await fetch("/api/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history }),
      });

      const data = await res.json();
      setIdea(data.idea);

      const updatedHistory = [...history, data.idea];
      setHistory(updatedHistory);
      localStorage.setItem("ideaHistory", JSON.stringify(updatedHistory));
    } catch (err) {
      setIdea("Error getting idea 😢");
    }
    setLoading(false);
  }

  function resetIdeas() {
    localStorage.removeItem("ideaHistory");
    setHistory([]);
    setIdea("History cleared! Click for new ideas ✨");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Ab Kya Karne Ka?</h1>

        <div className="bg-gray-100 rounded-2xl p-6 mb-6 min-h-[120px] flex items-center justify-center">
          <p className="text-2xl font-semibold text-gray-900">
            {loading ? "Thinking... 🤖" : idea}
          </p>
        </div>

        <button
          onClick={generateIdea}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition mr-3"
        >
          Give me an AI idea ✨
        </button>

        <button
          onClick={resetIdeas}
          className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
        >
          Reset ideas
        </button>
      </div>
    </div>
  );
}
