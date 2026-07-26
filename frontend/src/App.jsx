import { useState } from "react";
import API from "./services/api";

const suggestions = [
  "Cyberpunk city at night",
  "Astronaut riding a horse",
  "Neon samurai in Tokyo",
  "Luxury modern villa",
  "Dragon flying over mountains",
  "Ferrari in snowfall",
];

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/generate", {
        prompt,
      });

      setImage(
        `http://127.0.0.1:8000/generated_images/${response.data.image}`
      );
    } catch (err) {
      console.error(err);
      alert("Image generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <div className="background-grid"></div>

      <div className="container">

        {/* LEFT */}

        <div className="left-panel">

          <span className="badge">
            ✨ AI Powered
          </span>

          <h1>
            AI Image
            <br />
            Generator
          </h1>

          <p className="subtitle">
            Turn your imagination into stunning AI artwork in just a few
            seconds.
          </p>

          <textarea
            placeholder="Describe your imagination..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="chips">

            {suggestions.map((item) => (
              <button
                key={item}
                className="chip"
                onClick={() => setPrompt(item)}
              >
                {item}
              </button>
            ))}

          </div>

          <button
            className="generate-btn"
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? "Generating..." : "🚀 Generate Image"}
          </button>

        </div>

        {/* RIGHT */}

        <div className="right-panel">

          {!image ? (
            <div className="placeholder">

              <div className="placeholder-icon">
                🎨
              </div>

              <h2>Your artwork will appear here</h2>

              <p>
                Enter a creative prompt and let AI generate something amazing.
              </p>

            </div>
          ) : (
            <div className="image-card">

              <img
                src={image}
                alt="Generated"
              />

              <a
                href={image}
                download="generated-image.png"
                className="download-btn"
              >
                ⬇ Download Image
              </a>

            </div>
          )}

        </div>

      </div>
<footer className="footer">
  <p>Made with ❤️ by <strong>Akshat Gupta</strong></p>
  <p>© {new Date().getFullYear()} Akshat Gupta. All Rights Reserved.</p>
</footer>
    </div>
  );
}

export default App;