import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { extractText } from "./services/ocrService.js";
import { writeReply } from "./services/letterWriter.js";

const app = express();
app.use(cors());
app.use(express.json());

/* 🔧 Fix __dirname for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ✅ SERVE FRONTEND */
app.use(express.static(path.join(__dirname, "../frontend")));

/* OCR upload */
const upload = multer({ dest: "uploads/" });

app.post("/process-letter", upload.single("letter"), async (req, res) => {
  const text = await extractText(req.file.path);
  res.json({ text });
});

app.post("/generate-reply", async (req, res) => {
  const reply = await writeReply(req.body.telugu);
  res.json({ reply });
});

/* ❌ REMOVE old text-only root */
/* app.get("/", (req, res) => {
  res.send("DIVYA Backend is running");
}); */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DIVYA backend running on port ${PORT}`);
});
