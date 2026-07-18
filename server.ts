import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

// Lazy-initialize Gemini client to prevent startup crash if GEMINI_API_KEY is not defined yet
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not set in the environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Gemini-powered Smart Size Recommender
app.post("/api/ai/size-recommend", async (req, res) => {
  try {
    const { category, height, weight, age, preferredFit } = req.body;

    if (!category || !height || !weight) {
      res.status(400).json({ error: "Missing required fields: category, height, weight" });
      return;
    }

    const ai = getAiClient();
    
    const prompt = `Determine the best school uniform size recommendations for:
    - School Category: ${category}
    - Student Height (cm): ${height}
    - Student Weight (kg): ${weight}
    - Age (optional): ${age || 'N/A'}
    - Preferred Fit: ${preferredFit || 'Standard'}
    
    Suggest the most suitable sizing based on these details. Respond with a JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert sizing virtual assistant for Ridhvick Uniforms. Analyze height, weight, and fit preference to recommend the optimal standard size (XS, S, M, L, XL, or XXL) and give structured, helpful advice. Suggest size growth considerations (children grow fast). Respond ONLY with valid JSON matching the schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedSize: {
              type: Type.STRING,
              description: "The primary recommended size (e.g., 'M', 'L', 'S', etc.)"
            },
            confidence: {
              type: Type.STRING,
              description: "Confidence level of recommendation ('High' or 'Medium')"
            },
            notes: {
              type: Type.STRING,
              description: "Brief user-friendly styling advice or dynamic fit recommendations based on growth rate"
            },
            alternateSize: {
              type: Type.STRING,
              description: "An alternate size if they prefer a looser fit or for faster growth (optional)"
            }
          },
          required: ["recommendedSize", "confidence", "notes"]
        }
      }
    });

    const resultText = response.text?.trim() || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Gemini size-recommend error:", error);
    res.status(500).json({ 
      error: "Could not generate size recommendation", 
      details: error.message,
      // Provide a mock fallback in case the API key is not yet configured, to ensure seamless UX in the playground
      fallback: {
        recommendedSize: "M",
        confidence: "Medium (Fallback)",
        notes: "We recommend choosing a size slightly larger (e.g. size M) to allow for comfortable movement and room for natural growth throughout the school year."
      }
    });
  }
});

// AI Chatbot assistant for Catalog, Custom Embroidery and Fabric Questions
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      res.status(400).json({ error: "Missing message field" });
      return;
    }

    const ai = getAiClient();

    // System instruction detailing Ridhvick Uniforms
    const systemInstruction = `You are "Ridhvick AI Assistant", a friendly, knowledgeable virtual representative for Ridhvick Uniforms.
    Ridhvick Uniforms is a premier, high-quality manufacturer of school uniforms, sports wear, custom embroidery, and woven fabrics.
    - We have the Scholastic Prestige design line, featuring modern colors (Deep Blue #00346f, Yellow accents #fecb00).
    - We offer services under one roof: product design and sampling, premium woven fabrics, and custom embroidery/printing.
    - Our categories: Primary School (durable, stain-resistant), High School (sophisticated woven, tailored blazers), and Sports Wear (moisture-wicking mesh and aeroknit fabrics).
    - Answer customer queries about sizes, care instructions, ordering process (custom corporate or school volume orders), and embroidery designs.
    - Keep responses concise, warm, professional, and directly helpful. Highlight the "Ridhvick commitment to quality and comfort".`;

    const contents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const turn of chatHistory) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    res.status(500).json({ 
      error: "Could not fetch AI response", 
      details: error.message,
      fallback: "Hello! Thank you for reaching out to Ridhvick Uniforms. I am currently running in offline mode. For customized school or corporate bulk orders, custom embroidery designs, or specific sizing requests, please contact our support desk directly through our contact section below, and we'll be glad to assist you immediately!"
    });
  }
});

// Setup Vite Dev server or Serve static files
async function init() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

init();
