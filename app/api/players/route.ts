import { NextResponse } from "next/server";
import { PlayerService } from "@/services/playerService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (query) {
    const results = await PlayerService.searchPlayers(query);
    return NextResponse.json({ success: true, count: results.length, data: results });
  }

  const players = await PlayerService.getAllPlayers();
  return NextResponse.json({ success: true, count: players.length, data: players });
}
