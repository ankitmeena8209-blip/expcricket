import { NextResponse } from "next/server";
import { MatchService } from "@/services/matchService";

export async function GET() {
  const matches = await MatchService.getAllMatches();
  return NextResponse.json({ success: true, count: matches.length, data: matches });
}
