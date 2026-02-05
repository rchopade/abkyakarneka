import { useState } from "react"
import { fallbackIdeas } from "./ideas"

export default function App() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)



  async function getIdea() {
    setLoading(true)
    try {
      const res = await fetch("/api/idea")
      const data = await res.json()
      setIdea(data.idea)
    } catch (err) {
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
      <div style={{ textAlign: "center", width: "90%", maxWidth: "600px" }}>
        
        <h1 style={{ fontSize: "48px", marginBottom: "40px" }}>
          Ab Kya Karne Ka?
        </h1>

        <div style={{
          padding: "25px",
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          fontSize: "22px",
          minHeight: "80px",
          marginBottom: "30px",
          color: "#000"
        }}>
          {idea || "Click the button to get an idea ✨"}
        </div>

        <button
          onClick={getIdea}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            borderRadius: "30px",
            border: "none",
            background: "#4285F4",
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Thinking..." : "Get Idea"}
        </button>

      </div>
    </div>
  )
}
