import { getNextAdmin } from "@/data/admins";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  timestamp: string;
}

// Admin ismini olish uchun yordamchi funksiya
function getAdminName(adminId: string): string {
  const admins = process.env.ADMINS?.split(",") || [];
  for (const item of admins) {
    const [id, name] = item.trim().split("|");
    if (id === adminId) return name || "Admin";
  }
  return "Admin";
}

// 1. CALLBACKNI QAYTA ISHLASH (Admin tugmani bosganda)
export async function handleCallback(callbackQuery: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const callbackData = callbackQuery.data; // "adminId|phone"
  const messageId = callbackQuery.message.message_id;
  const chatId = callbackQuery.message.chat.id;
  const messageText = callbackQuery.message.text;

  const [adminId, phone] = callbackData.split("|");
  const adminName = getAdminName(adminId);

  // --- MIJOZ ISMINI XABARDAN QIDIRIB OLISH ---
  const nameLine = messageText.split("\n").find((line: string) => line.includes("Ism:"));
  const clientName = nameLine ? nameLine.split(":")[1].trim() : "Noma'lum";

  // A) Adminning o'zidagi xabarni yangilash (Tugmani o'chirish)
  const updatedText =
    `${messageText}\n\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `✅ <b>BU MIJOZ BILAN BOG'LANILDI</b>\n` +
    `👤 <b>Mas'ul admin:</b> ${adminName}`;

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: updatedText,
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [] },
    }),
  });

  // B) HISOBOT KANALIGA (TELEGRAM_CHANNEL_ID) YUBORISH
  const logChannelId = process.env.TELEGRAM_CHANNEL_ID;
  if (logChannelId) {
    const now = new Date();
    const callTime = now.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // SIZ SO'RAGAN FORMAT:
    const logFormat =
      `⚡️ <b>HISOBOT: QO'NG'IROQ AMALGA OSHIRILDI</b>\n` +
      `───────────────────\n\n` +
      `👨‍💻 <b>Admin:</b> ${adminName}\n` +
      `👤 <b>Mijoz:</b> ${clientName}\n` +
      `📞 <b>Mijoz tel:</b> <code>${phone}</code>\n` +
      `⏰ <b>Vaqt:</b> ${callTime}\n\n` +
      `📊 <b>Holat:</b> #Bog'lanildi`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: Number(logChannelId),
        text: logFormat,
        parse_mode: "HTML",
      }),
    });
  }

  // C) Popup bildirishnoma
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQuery.id,
      text: "✅ Hisobot kanalga yuborildi!",
    }),
  });
}

// 2. YANGI REGISTRATSIYA (Arxiv va Adminga yuborish)
export async function sendTelegramMessage(user: UserData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const archiveChannelId = process.env.TELEGRAM_ARCHIVE_CHANEL;
  const admin = getNextAdmin();
  
  if (!token) throw new Error("Bot token topilmadi");

  // Admin va Arxiv uchun umumiy matn
  const baseText =
    `🆕 <b>YANGI MUROJAAT TUSHDI</b>\n` +
    `───────────────────\n\n` +
    `👤 <b>Ism:</b> ${user.firstName} ${user.lastName}\n` +
    `📞 <b>Tel:</b> <code>${user.phone}</code>\n` +
    `📅 <b>Sana:</b> ${user.timestamp}\n\n` +
    `#YangiMurojaat #Arxiv`;

  // --- 1. ARXIV KANALIGA YUBORISH ---
  if (archiveChannelId) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: Number(archiveChannelId),
        text: `🗄 <b>ARXIV NUSXASI</b>\n\n${baseText}`,
        parse_mode: "HTML",
      }),
    });
  }

  // --- 2. ADMINGA YUBORISH ---
  if (admin) {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: Number(admin.id),
        text: baseText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📞 Bog'landim (Tasdiqlash)",
                callback_data: `${admin.id}|${user.phone}`,
              },
            ],
          ],
        },
      }),
    });

    const telegramData = await res.json();

    // API error (assignedAdmin undefined) bo'lmasligi uchun:
    return {
      ...telegramData,
      adminName: admin.name
    };
  }

  return { ok: false, error: "Admin topilmadi" };
}