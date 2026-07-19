import { NextResponse } from "next/server";
import { SearchService } from "@/services/searchService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const results = await SearchService.globalSearch(q);
  return NextResponse.json({ success: true, count: results.length, data: results });
}
