import { NextResponse } from "next/server";
import { CricketDataService } from "@/services/cricketDataService";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await CricketDataService.syncAllData();
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API /api/cricket-sync error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await CricketDataService.syncAllData();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
