import { getNextAdmin } from "@/data/admins";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  timestamp: string;
}

function getAdminName(adminId: string): string {
  const admins = process.env.ADMINS?.split(",") || [];
  for (const item of admins) {
    const [id, name] = item.trim().split("|");
    if (id === adminId) return name || "Admin";
  }
  return "Admin";
}

// 1. CALLBACKNI QAYTA ISHLASH (Tugma bosilganda)
export async function handleCallback(callbackQuery: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const callbackData = callbackQuery.data;
  const messageId = callbackQuery.message.message_id;
  const chatId = callbackQuery.message.chat.id;
  const messageText = callbackQuery.message.text;

  const [adminId, phone] = callbackData.split("|");
  const adminName = getAdminName(adminId);

  // Ismni xabardan ajratib olish (Vizual chiroyli chiqishi uchun)
  const originalSender = messageText.split("\n")[2] || "Mijoz";

  // Xabarni yangilash (Adminga o'zida ko'rinadigan qismi)
  const updatedText =
    `${messageText}\n\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `✅ <b>BU MIJOZ BILAN BOG'LANILDI</b>\n` +
    `👤 <b>Admin:</b> ${adminName}`;

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: updatedText,
      parse_mode: "HTML",
    }),
  });

  // Tugmalarni o'chirish
  await fetch(`https://api.telegram.org/bot${token}/editMessageReplyMarkup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: [] },
    }),
  });

  // Kanalga professional Log yuborish
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  if (channelId) {
    const now = new Date();
    const callTime = now.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const logText =
      `⚡️ <b>HISOBOT: QO'NG'IROQ AMALGA OSHIRILDI</b>\n` +
      `───────────────────\n\n` +
      `👨‍💻 <b>Admin:</b> <code>${adminName}</code>\n` +
      `📞 <b>Mijoz:</b> <code>${phone}</code>\n` +
      `⏰ <b>Vaqt:</b> ${callTime}\n\n` +
      `📊 <b>Holat:</b> #Bog'lanildi`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: Number(channelId),
        text: logText,
        parse_mode: "HTML",
      }),
    });
  }

  // Bildirishnoma (Popup)
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQuery.id,
      text: "✅ Ma'lumot kanalga saqlandi!",
    }),
  });
}

// 2. YANGI REGISTRATSIYA (Adminga boradigan birinchi xabar)
export async function sendTelegramMessage(user: UserData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const admin = getNextAdmin();
  if (!token || !admin) throw new Error("Bot token yoki admin topilmadi");

  // Xabarni vizual boyitish
  const text =
    `🆕 <b>YANGI MUROJAAT TUSHDI</b>\n` +
    `───────────────────\n\n` +
    `👤 <b>Ism:</b> ${user.firstName} ${user.lastName}\n` +
    `📞 <b>Tel:</b> <code>${user.phone}</code>\n` +
    `📅 <b>Sana:</b> ${user.timestamp}\n\n` +
    `⚡️ <b>Mas'ul admin:</b> <u>${admin.name}</u>\n\n` +
    `<i>Iltimos, mijoz bilan tezroq bog'laning!</i>`;

  const body = {
    chat_id: Number(admin.id),
    text,
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
  };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
}
