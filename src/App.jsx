// src/App.jsx
import { useState, useEffect } from "react";

// Generate 1000+ fallback ideas programmatically
const actions = [
  "Clean", "Organize", "Write", "Learn", "Watch", "Listen to", "Try", "Practice",
  "Stretch", "Call", "Text", "Walk", "Jog", "Plan", "Cook", "Bake", "Draw",
  "Sketch", "Meditate", "Declutter", "Backup", "Review", "Explore", "Research",
  "Update", "Create", "Read", "Play", "Build", "Fix", "Rearrange"
];

const objects = [
  "your desk", "your phone photos", "your wardrobe", "your bookmarks",
  "a gratitude list", "a journal page", "a new recipe", "a TED talk",
  "a podcast episode", "a playlist", "your email inbox", "your downloads folder",
  "your goals list", "your resume", "your LinkedIn profile", "your notes",
  "your desktop files", "your kitchen shelf", "a sketch", "a blog idea",
  "a new word list", "your finances", "your to-do list", "a new hobby",
  "a new app", "a friend", "a family member", "a short workout",
  "a YouTube tutorial", "your calendar"
];

function buildFallbackIdeas() {
  const ideas = [];
  actions.forEach(a => {
    objects.forEach(o => {
      ideas.push(`${a} ${o}`);
    });
  });
  return ideas; // ~900 ideas
}

const fallbackIdeas = [
  ...buildFallbackIdeas(),
  // extra fun ideas to cross 1000
  "Make chai and relax ☕","Do 20 pushups 💪","Dance to one song 💃",
  "Write 5 business ideas 💡","Plan a weekend trip ✈️","Water your plants 🌱",
  "Take a power nap 😴","Clean your keyboard ⌨️","Try breathing exercise 🌬️",
  "Learn 5 new English words 📖","Watch a documentary 🎬","Do stretching 🧘",
  "Message an old friend 📱","Backup your phone ☁️","Update passwords 🔐",
  "Sort WhatsApp chats 💬","Delete unused apps 🗑️","Polish shoes 👞",
  "Clean your car 🚗","Plan investments 📈","Check news headlines 📰"
];

export default function App() {
  const [idea, setIdea] = useState("Click the button to get an idea ✨");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("ideaHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  function getLocalIdea() {
    const unused = fallbackIdeas.filter(i => !history.includes(i));
    const pool = unused.length ? unused : fallbackIdeas;
    const random = pool[Math.floor(Math.random() * pool.length)];
    saveIdea(random);
  }

  function saveIdea(newIdea) {
    setIdea(newIdea);
    const updated = [...history, newIdea];
    setHistory(updated);
    localStorage.setItem("ideaHistory", JSON.stringify(updated));
  }

  async function generateIdea() {
    setLoading(true);
    try {
      const res = await fetch("/api/idea", { method: "POST" });
      const data = await res.json();

      if (!data.idea || data.idea.includes("failed")) {
        getLocalIdea();
      } else {
        saveIdea(data.idea);
      }
    } catch {
      getLocalIdea();
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
          Give me an idea ✨
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
