import { useState } from "react"
import { fallbackIdeas } from "./ideas.js"

export default function App() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)

  async function getIdea() {
    setLoading(true)
    try {
      const res = await fetch("/api/idea")
      const data = await res.json()

      if (data.idea) {
        setIdea(data.idea)
      } else {
        throw new Error("AI failed")
      }
    } catch {
      const random =
        fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)]
      setIdea(random)
    }
    setLoading(false)
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
          padding: "28px",
          borderRadius: "28px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
          fontSize: "24px",
          minHeight: "90px",
          marginBottom: "35px",
          color: "#000",
          background: "#fff"
        }}>
          {idea || "Click the button to get an idea ✨"}
        </div>

        {/* Button */}
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
          {loading ? "Thinking..." : "Get Idea"}
        </button>

      </div>
    </div>
  )
}
