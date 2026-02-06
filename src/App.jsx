import { useState, useEffect } from "react"
import { ideas } from "./ideas.js"

export default function App() {
  const [idea, setIdea] = useState("")
  const [usedIdeas, setUsedIdeas] = useState([])

  // Load used ideas from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("usedIdeas")
    if (saved) setUsedIdeas(JSON.parse(saved))
  }, [])

  function getIdea() {
    const remaining = ideas.filter(i => !usedIdeas.includes(i))

    if (remaining.length === 0) {
      setIdea("🎉 You finished all ideas! Click Reset to start again.")
      return
    }

    const random = remaining[Math.floor(Math.random() * remaining.length)]
    const updatedUsed = [...usedIdeas, random]

    setIdea(random)
    setUsedIdeas(updatedUsed)
    localStorage.setItem("usedIdeas", JSON.stringify(updatedUsed))
  }

  function resetIdeas() {
    localStorage.removeItem("usedIdeas")
    setUsedIdeas([])
    setIdea("Memory cleared! Click Get Idea 🎉")
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#ffffff",
      fontFamily: "Arial"
    }}>
      <div style={{ textAlign: "center", width: "90%", maxWidth: "700px" }}>
        
        {/* Title */}
        <h1 style={{
          fontSize: "56px",
          fontWeight: "600",
          marginBottom: "50px",
          color: "#000"
        }}>
          Ab kya karneka?
        </h1>

        {/* Idea Card */}
        <div style={{
          padding: "30px",
          borderRadius: "28px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
          fontSize: "24px",
          minHeight: "90px",
          marginBottom: "35px",
          color: "#000",
          background: "#fff"
        }}>
          {idea || "Click Get Idea to begin ✨"}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button
            onClick={getIdea}
            style={{
              padding: "16px 34px",
              fontSize: "20px",
              borderRadius: "30px",
              border: "none",
              background: "#4285F4",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
            }}
          >
            Get Idea
          </button>

          <button
            onClick={resetIdeas}
            style={{
              padding: "16px 34px",
              fontSize: "20px",
              borderRadius: "30px",
              border: "none",
              background: "#1a73e8", // darker blue for distinction
              color: "white",
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
            }}
          >
            Reset Memory
          </button>
        </div>

      </div>
    </div>
  )
}
