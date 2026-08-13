import fs from "node:fs";
import path from "node:path";

interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string[];
  content_ms: string;
  content_en: string;
  title_ms?: string;
  title_en?: string;
  source_url?: string;
  pdf_texts?: { extracted_text: string }[];
}

let cachedKnowledgeBase: KnowledgeEntry[] | null = null;

function loadKnowledgeBase(): KnowledgeEntry[] {
  if (cachedKnowledgeBase) return cachedKnowledgeBase;

  const knowledgePath = path.join(process.cwd(), "data", "knowledge.json");
  const ocrPath = path.join(process.cwd(), "data", "knowledge_ocr.json");

  let knowledgeBase: KnowledgeEntry[] = [];
  try {
    if (fs.existsSync(knowledgePath)) {
      knowledgeBase = knowledgeBase.concat(JSON.parse(fs.readFileSync(knowledgePath, "utf-8")));
    }
    if (fs.existsSync(ocrPath)) {
      knowledgeBase = knowledgeBase.concat(JSON.parse(fs.readFileSync(ocrPath, "utf-8")));
    }
  } catch (err) {
    console.error("Error reading knowledge base:", err);
  }

  cachedKnowledgeBase = knowledgeBase;
  return knowledgeBase;
}

function retrieveRelevantKnowledge(query: string, limit = 1): KnowledgeEntry[] {
  const knowledgeBase = loadKnowledgeBase();
  const queryTokens = query.toLowerCase().split(/\W+/).filter(Boolean);
  if (queryTokens.length === 0) return [];

  const scoredEntries = knowledgeBase.map((entry) => {
    let score = 0;
    (entry.keywords || []).forEach((kw) => {
      if (queryTokens.includes(kw.toLowerCase())) score += 2;
    });
    if (query.toLowerCase().includes((entry.topic || "").toLowerCase())) score += 3;
    const content = `${entry.content_ms || ""} ${entry.content_en || ""}`.toLowerCase();
    queryTokens.forEach((t) => {
      if (t.length > 3 && content.includes(t)) score += 1;
    });
    return { entry, score };
  });

  return scoredEntries
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry);
}

function buildContext(relevantKnowledge: KnowledgeEntry[], lang: string): string {
  if (relevantKnowledge.length === 0) {
    return "Tiada maklumat khusus dijumpai dalam pangkalan data. (No specific information found in the database.)";
  }
  return relevantKnowledge
    .map((k) => {
      let text = lang === "ms" ? k.content_ms : k.content_en;
      if (k.pdf_texts && k.pdf_texts.length > 0) {
        text += "\n[Maklumat Tambahan dari PDF]:\n" + k.pdf_texts.map((p) => p.extracted_text).join("\n");
      }
      text = text.replace(/Skip to content[\s\S]*?(?=Home|Utama|Info Korporat)/i, "");
      text = text.replace(/SELANGOR STATE TREASURY[\s\S]*?(?=Last updated on:|Dikemaskini pada:)/i, "");
      text = text.replace(/Perbendaharaan Negeri Selangor[\s\S]*?(?=Hakcipta|Copyright)/i, "");
      text = text.replace(/\n{2,}/g, "\n");
      if (text.length > 2500) text = text.substring(0, 2500) + "...";
      return text;
    })
    .join("\n\n");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages, lang = "ms" } = req.body ?? {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Invalid messages array" });
      return;
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const relevantKnowledge = retrieveRelevantKnowledge(lastUserMessage, 1);
    const contextString = buildContext(relevantKnowledge, lang);

    const systemPrompt = `You are an AI Kiosk Assistant for Perbendaharaan Negeri Selangor (PNS).
Your language is strictly: ${lang === "ms" ? "Malay (Bahasa Melayu)" : "English"}.
Be helpful, professional, and very concise (2-4 sentences). Do not use markdown formatting.

IMPORTANT KNOWLEDGE CONTEXT:
${contextString}

Answer the user's question using ONLY the knowledge context provided above. If the context does not contain the answer, politely say you don't have that information and advise them to speak to an officer at the counter.`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: lastUserMessage },
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const matchedEntry = relevantKnowledge[0] ?? null;
    const source = matchedEntry
      ? { title: lang === "ms" ? matchedEntry.title_ms : matchedEntry.title_en, url: matchedEntry.source_url }
      : null;

    if (!apiKey) {
      res.status(200).json({
        role: "assistant",
        content:
          lang === "ms"
            ? "(Mod ujian) Sistem AI belum disambungkan sepenuhnya. Sila hubungi kaunter untuk maklumat lanjut."
            : "(Test mode) The AI system is not fully connected yet. Please contact the counter for more information.",
        source,
      });
      return;
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: apiMessages,
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || "Failed to fetch from LLM provider";
      res.status(response.status).json({ error: errorMessage });
      return;
    }

    const data = await response.json();
    const replyContent =
      data.choices?.[0]?.message?.content ||
      (lang === "ms"
        ? "Maaf, saya tidak dapat memproses permintaan anda pada masa ini. Sila cuba lagi."
        : "Sorry, I am unable to process your request right now. Please try again.");

    res.status(200).json({ role: "assistant", content: replyContent, source });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
