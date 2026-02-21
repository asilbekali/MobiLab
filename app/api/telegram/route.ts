import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/service/telegram.service";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, phone } = await req.json();

    if (!firstName || !lastName || !phone) {
      return NextResponse.json(
        { success: false, error: "Barcha maydonlarni to'ldiring" },
        { status: 400 },
      );
    }   

    const timestamp = new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      dateStyle: "full",
      timeStyle: "medium",
    });
    
    const result = await sendTelegramMessage({
      firstName,
      lastName,
      phone,
      timestamp,
    });

    return NextResponse.json({
      success: true,
      message: "So'rovingiz yuborildi!",
      assignedAdmin: result.adminName,
    });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, error: "Xatolik yuz berdi" },
      { status: 500 },
    );
  }
}
