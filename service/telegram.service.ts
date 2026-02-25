import { getNextAdmin } from "@/data/admins";
import fs from "fs";
import path from "path";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  timestamp: string;
}

// 0. MUROJAAT RAQAMLARINI BOSHQARISH
function getOrderNumbers() {
  const filePath = path.join(process.cwd(), "order-count.json");
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;

  let data = { total: 0, monthlyCount: 0, lastMonth: currentMonth };

  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (e) { console.error(e); }
  }

  if (data.lastMonth !== currentMonth) {
    data.monthlyCount = 0;
    data.lastMonth = currentMonth;
  }

  data.total += 1;
  data.monthlyCount += 1;
  fs.writeFileSync(filePath, JSON.stringify(data));
  return { total: data.total, monthly: data.monthlyCount };
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
  const callbackData = callbackQuery.data; // Format: adminId|phone|fullName
  const messageId = callbackQuery.message.message_id;
  const chatId = callbackQuery.message.chat.id;
  const messageText = callbackQuery.message.text;

  // Ma'lumotlarni ajratib olamiz
  const [adminId, phone, fullName] = callbackData.split("|");
  const adminName = getAdminName(adminId);

  // Admin xabarini yangilash
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

  // HISOBOT KANALIGA YUBORISH (Siz so'ragan format)
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  if (channelId) {
    const now = new Date();
    const callTime = now.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).replace(',', '');

    const logText =
      `⚡️ <b>HISOBOT: QO'NG'IROQ AMALGA OSHIRILDI</b>\n` +
      `───────────────────\n\n` +
      `👨‍💻 <b>Admin:</b> ${adminName}\n` +
      `📞 <b>Mijoz:</b> ${fullName}\n` +
      `<b>mijoz telefon:</b> ${phone}\n` +
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

  // Popup bildirishnoma
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQuery.id,
      text: "✅ Hisobot guruhga yuborildi!",
    }),
  });
}

// 2. YANGI REGISTRATSIYA
export async function sendTelegramMessage(user: UserData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const archiveChannelId = process.env.TELEGRAM_ARCHIVE_CHANEL;
  const admin = getNextAdmin();
  
  if (!token || !admin) throw new Error("Bot token yoki admin topilmadi");

  const counts = getOrderNumbers();
  const fullName = `${user.firstName} ${user.lastName}`;

  // Arxiv formati
  const archiveText = 
    `Umumiy murojat raqami ${counts.total}\n` +
    `🆕 Bu oy ning Murojaat Raqami: ${counts.monthly}\n` +
    `───────────────────\n\n` +
    `👤 <b>Ism:</b> ${fullName}\n` +
    `📞 <b>Tel:</b> <code>${user.phone}</code>\n` +
    `📅 <b>Sana:</b> ${user.timestamp}\n\n` +
    `<b>biriktirilgan admin:</b> ${admin.name}`;

  // Adminga boradigan xabar
  const adminText =
    `🆕 <b>YANGI MUROJAAT TUSHDI</b>\n` +
    `───────────────────\n\n` +
    `👤 <b>Ism:</b> ${fullName}\n` +
    `📞 <b>Tel:</b> <code>${user.phone}</code>\n` +
    `📅 <b>Sana:</b> ${user.timestamp}\n\n` +
    `⚡️ <b>Mas'ul admin:</b> <u>${admin.name}</u>`;

  // Arxivga yuborish
  if (archiveChannelId) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: Number(archiveChannelId),
        text: archiveText,
        parse_mode: "HTML",
      }),
    });
  }

  // Adminga yuborish (Tugma ichiga Ism-Familiyani ham joyladik)
  const body = {
    chat_id: Number(admin.id),
    text: adminText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📞 Bog'landim (Tasdiqlash)",
            // callback_data ga ismni ham qo'shdik: adminId|phone|fullName
            callback_data: `${admin.id}|${user.phone}|${fullName}`,
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