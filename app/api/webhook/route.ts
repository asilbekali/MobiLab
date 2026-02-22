import { NextRequest, NextResponse } from "next/server";
import { handleCallback } from "@/service/telegram.service";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    // Agar tugma (callback) bosilgan bo'lsa
    if (update.callback_query) {
      await handleCallback(update.callback_query);
    }

    // Telegramga muvaffaqiyatli qabul qilinganini bildirish (shart!)
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    // Xatolik bo'lsa ham 200 qaytaramiz, aks holda Telegram xabarni qayta-qayta yuboraveradi
    return NextResponse.json({ ok: true });
  }
}
