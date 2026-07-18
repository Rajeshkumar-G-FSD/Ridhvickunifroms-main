var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = Number(process.env.PORT) || 3e3;
var HOST = process.env.HOST || "0.0.0.0";
app.use(import_express.default.json());
var aiClient = null;
function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not set in the environment variables.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
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
    - Age (optional): ${age || "N/A"}
    - Preferred Fit: ${preferredFit || "Standard"}
    
    Suggest the most suitable sizing based on these details. Respond with a JSON object.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert sizing virtual assistant for Ridhvick Uniforms. Analyze height, weight, and fit preference to recommend the optimal standard size (XS, S, M, L, XL, or XXL) and give structured, helpful advice. Suggest size growth considerations (children grow fast). Respond ONLY with valid JSON matching the schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            recommendedSize: {
              type: import_genai.Type.STRING,
              description: "The primary recommended size (e.g., 'M', 'L', 'S', etc.)"
            },
            confidence: {
              type: import_genai.Type.STRING,
              description: "Confidence level of recommendation ('High' or 'Medium')"
            },
            notes: {
              type: import_genai.Type.STRING,
              description: "Brief user-friendly styling advice or dynamic fit recommendations based on growth rate"
            },
            alternateSize: {
              type: import_genai.Type.STRING,
              description: "An alternate size if they prefer a looser fit or for faster growth (optional)"
            }
          },
          required: ["recommendedSize", "confidence", "notes"]
        }
      }
    });
    const resultText = response.text?.trim() || "{}";
    res.json(JSON.parse(resultText));
  } catch (error) {
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
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    if (!message) {
      res.status(400).json({ error: "Missing message field" });
      return;
    }
    const ai = getAiClient();
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
        temperature: 0.7
      }
    });
    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini chat error:", error);
    res.status(500).json({
      error: "Could not fetch AI response",
      details: error.message,
      fallback: "Hello! Thank you for reaching out to Ridhvick Uniforms. I am currently running in offline mode. For customized school or corporate bulk orders, custom embroidery designs, or specific sizing requests, please contact our support desk directly through our contact section below, and we'll be glad to assist you immediately!"
    });
  }
});
async function init() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
init();
//# sourceMappingURL=server.cjs.map
