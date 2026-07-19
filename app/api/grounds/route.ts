import { NextResponse } from "next/server";
import { GroundService } from "@/services/groundService";

export async function GET() {
  const grounds = await GroundService.getAllGrounds();
  return NextResponse.json({ success: true, count: grounds.length, data: grounds });
}
