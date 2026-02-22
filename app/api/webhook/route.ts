import { NextRequest, NextResponse } from "next/server";
import { handleCallback } from "@/service/telegram.service";

// Buni API faylining eng tepasida qoldiring
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    if (update.callback_query) {
      // Callback kelganda await bilan kutish shart
      await handleCallback(update.callback_query);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Vercel Logs-da xatoni ko'rish uchun console.error qoldiring
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}

// Telegram ba'zida Webhook-ni tekshirish uchun GET so'rovi ham yuborishi mumkin
export async function GET() {
  return NextResponse.json({ message: "Webhook is active" });
}
