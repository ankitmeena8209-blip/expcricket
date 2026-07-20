import { NextResponse } from "next/server";
import { AIService } from "@/services/aiService";
import { AIAnalysisRequest } from "@/types/ai";

export async function POST(request: Request) {
  try {
    const body: AIAnalysisRequest = await request.json();
    console.log("\n==================================================");
    console.log("[API /api/ai] Received incoming AI Request:");
    console.log("Prompt:", body.prompt);
    console.log("Context Type:", body.contextType || "GENERAL");
    console.log("Provider:", body.provider || "groq");
    console.log("==================================================");

    if (!body.prompt || !body.prompt.trim()) {
      return NextResponse.json({ success: false, error: "Prompt parameter required" }, { status: 400 });
    }

    const response = await AIService.analyzeQuery(body);

    console.log("\n[API /api/ai] Successfully generated response:");
    console.log("Model:", response.modelName);
    console.log("Response Content Preview:", response.content.slice(0, 100) + "...");
    console.log("==================================================\n");

    return NextResponse.json({ success: true, data: response });
  } catch (err: any) {
    console.error("[API /api/ai] Processing Error Exception:", err);
    return NextResponse.json(
      { success: false, error: err.message || "AI Service processing error" },
      { status: 500 }
    );
  }
}
