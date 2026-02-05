import { useState, useEffect } from "react";

const ideas = [
  "Go for a 20-min walk and listen to a podcast 🎧",
  "Call a friend you haven't spoken to in months ☎️",
  "Declutter one drawer in your house 🧹",
  "Watch a random TED talk 🎥",
  "Learn 5 phrases of a new language 🌍",
  "Cook a dish you've never tried 🍳",
  "Write 10 things you're grateful for ✍️",
  "Do a 7-minute workout 💪",
  "Read 10 pages of a book 📚",
  "Plan your dream vacation ✈️",
  "Organize your phone photos 📱",
  "Start brainstorming a side-hustle 💡",
  "Try meditation for 10 minutes 🧘",
  "Clean your workspace 🖥️",
  "Start a journal 📓",
  "Watch a documentary 🎬",
  "Explore a new music genre 🎶",
  "Take a power nap 😴",
  "Write a future letter to yourself 💌"
];

function App() {
  const [idea, setIdea] = useState("Click the button to get an idea ✨");
  const [usedIdeas, setUsedIdeas] = useState([]);
  const [allowRepeats, setAllowRepeats] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("usedIdeas");
    if (stored) setUsedIdeas(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("usedIdeas", JSON.stringify(usedIdeas));
  }, [usedIdeas]);

  const generateIdea = () => {
    let availableIdeas = ideas;

    if (!allowRepeats) {
      availableIdeas = ideas.filter(i => !usedIdeas.includes(i));
    }

    if (availableIdeas.length === 0) {
      setUsedIdeas([]);
      availableIdeas = ideas;
    }

    const random = availableIdeas[Math.floor(Math.random() * availableIdeas.length)];
    setIdea(random);

    if (!usedIdeas.includes(random)) {
      setUsedIdeas([...usedIdeas, random]);
    }
  };

  const resetHistory = () => {
    setUsedIdeas([]);
    localStorage.removeItem("usedIdeas");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #6366f1, #ec4899)",
      fontFamily: "Arial",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        textAlign: "center",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        <h1>Ab Kya Karne Ka? 🤔</h1>
        <p>AI remembers what you already did</p>

        <div style={{
          background: "#f3f4f6",
          padding: "20px",
          borderRadius: "12px",
          margin: "20px 0",
          minHeight: "60px"
        }}>
          {idea}
        </div>

        <button onClick={generateIdea} style={btnStyle}>
          Give me something to do ✨
        </button>

        <br /><br />

        <button onClick={() => setAllowRepeats(!allowRepeats)} style={btnStyle}>
          {allowRepeats ? "Repeats allowed" : "Avoid repeats (Memory ON)"}
        </button>

        <br /><br />

        <button onClick={resetHistory} style={btnStyle}>
          Reset history
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#6366f1",
  color: "white",
  cursor: "pointer",
  fontSize: "16px"
};

export default App;
