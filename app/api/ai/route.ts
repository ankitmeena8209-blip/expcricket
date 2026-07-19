import { NextResponse } from "next/server";
import { AIService } from "@/services/aiService";
import { AIAnalysisRequest } from "@/types/ai";

export async function POST(request: Request) {
  try {
    const body: AIAnalysisRequest = await request.json();
    if (!body.prompt) {
      return NextResponse.json({ success: false, error: "Prompt parameter required" }, { status: 400 });
    }
    const response = await AIService.analyzeQuery(body);
    return NextResponse.json({ success: true, data: response });
  } catch {
    return NextResponse.json({ success: false, error: "AI Service processing error" }, { status: 500 });
  }
}
