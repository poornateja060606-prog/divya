import express from "express";
import cors from "cors";
import multer from "multer";
import { extractText } from "./services/ocrService.js";
import { writeReply } from "./services/letterWriter.js";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

/* ✅ ROOT HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("DIVYA Backend is running");
});

/* OCR */
app.post("/process-letter", upload.single("letter"), async (req, res) => {
  const text = await extractText(req.file.path);
  res.json({ text });
});

/* LETTER GENERATION */
app.post("/generate-reply", async (req, res) => {
  const reply = await writeReply(req.body.telugu);
  res.json({ reply });
});

app.listen(3000, () => {
  console.log("DIVYA backend running on port 3000");
});
