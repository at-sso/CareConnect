import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Get count of users from database
    const result = await query("SELECT COUNT(*) as count FROM users");

    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    const count = result[0].count || 0;

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error getting user count:", error);
    return NextResponse.json(
      { error: "Error getting user count", count: 0 },
      { status: 500 }
    );
  }
}
