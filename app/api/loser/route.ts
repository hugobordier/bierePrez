import { type NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET() {
  try {
    const loser = await kv.get<{ name: string; timestamp: number }>("current-loser")
    const leaderboard = await kv.lrange<{ name: string; timestamp: number }>("leaderboard", 0, 19) // Get last 20 entries

    return NextResponse.json({ loser, leaderboard: leaderboard || [] })
  } catch (error) {
    console.error("Error fetching loser:", error)
    return NextResponse.json({ error: "Failed to fetch loser" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const loserData = {
      name: name.trim(),
      timestamp: Date.now(),
    }

    await kv.set("current-loser", loserData)
    await kv.lpush("leaderboard", loserData)
    await kv.ltrim("leaderboard", 0, 49) // Keep only last 50 entries

    return NextResponse.json({ success: true, loser: loserData })
  } catch (error) {
    console.error("Error updating loser:", error)
    return NextResponse.json({ error: "Failed to update loser" }, { status: 500 })
  }
}
