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
      <div style={{ textAlign: "center", width: "90%", maxWidth: "650px" }}>
        
        {/* Heading */}
        <h1 style={{
          fontSize: "52px",
          fontWeight: "500",
          marginBottom: "40px"
        }}>
          Ab kya karneka?
        </h1>

        {/* Idea text */}
        <div style={{
          fontSize: "24px",
          minHeight: "70px",
          marginBottom: "35px",
          color: "#222"
        }}>
          {idea || "Click below to get an idea ✨"}
        </div>

        {/* Button */}
        <button
          onClick={getIdea}
          style={{
            padding: "14px 28px",
            fontSize: "18px",
            borderRadius: "24px",
            border: "1px solid #dadce0",
            background: "#f8f9fa",
            cursor: "pointer"
          }}
        >
          {loading ? "Thinking..." : "Get idea"}
        </button>

      </div>
    </div>
  )
}
