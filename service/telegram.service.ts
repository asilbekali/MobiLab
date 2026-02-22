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

// CALLBACKNI QAYTA ISHLASH (Webhook orqali chaqiriladi)
export async function handleCallback(callbackQuery: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const callbackData = callbackQuery.data;
  const messageId = callbackQuery.message.message_id;
  const chatId = callbackQuery.message.chat.id;
  const messageText = callbackQuery.message.text;

  const [adminId, phone] = callbackData.split("|");
  const adminName = getAdminName(adminId);

  // 1. Xabarni yangilash
  const newText =
    messageText +
    `\n\n✅ <b>Siz ushbu foydalanuvchiga qo'ng'iroq qildingiz</b>`;

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: newText,
      parse_mode: "HTML",
    }),
  });

  // 2. Tugmalarni o'chirish
  await fetch(`https://api.telegram.org/bot${token}/editMessageReplyMarkup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: [] },
    }),
  });

  // 3. Bildirishnoma yuborish
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQuery.id,
      text: "✅ Qo'ng'iroq qilindi",
    }),
  });

  // 4. Kanalga log yuborish
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  if (channelId) {
    const now = new Date();
    const callTime = now.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      dateStyle: "full",
      timeStyle: "medium",
    });
    const logText = `📞 QO'NG'IROQ QILINDI\n\n👤 Admin: ${adminName}\n📞 Telefon: ${phone}\n⏰ Vaqt: ${callTime}`;

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
}

export async function sendTelegramMessage(user: UserData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const admin = getNextAdmin();
  if (!token || !admin) throw new Error("Bot token yoki admin topilmadi");

  const text = `📩 YANGI REGISTRATSIYA\n\n👤 Ism: ${user.firstName} ${user.lastName}\n📞 Telefon: ${user.phone}\n⏰ Vaqt: ${user.timestamp}\n\n👤 Biriktirildi: ${admin.name}`;

  const body = {
    chat_id: Number(admin.id),
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📞 Qo'ng'iroq qilindi",
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
