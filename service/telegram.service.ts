import { getNextAdmin } from "@/data/admins";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  timestamp: string;
}

// Admin nomini olish
function getAdminName(adminId: string): string {
  const admins = process.env.ADMINS?.split(",") || [];
  for (const item of admins) {
    const [id, name] = item.trim().split("|");
    if (id === adminId) {
      return name || "Admin";
    }
  }
  return "Admin";
}

// POLLING UCHUN O'ZGARUVCHILAR
let lastUpdateId = 0;
let pollingInterval: NodeJS.Timeout | null = null;
let isPollingStarted = false;
const processedCallbacks = new Set<string>(); // Qayta ishlangan callback larni saqlash

// Pollingni boshlash
export function startPolling() {
  if (isPollingStarted) {
    return;
  }

  console.log("🚀 Polling started");
  isPollingStarted = true;

  pollingInterval = setInterval(async () => {
    await checkUpdates();
  }, 3000);

  checkUpdates();
}

// Pollingni to'xtatish
export function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    isPollingStarted = false;
    processedCallbacks.clear();
    console.log("🛑 Polling stopped");
  }
}

// Yangi update larni tekshirish
async function checkUpdates() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  try {
    const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId}&timeout=5`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.ok && data.result.length > 0) {
      for (const update of data.result) {
        await processUpdate(update);
        lastUpdateId = update.update_id + 1; // KEYINGI update ID ni saqlash
      }
    }
  } catch (error) {
    console.error("❌ Polling error:", error);
  }
}

// Update larni qayta ishlash
async function processUpdate(update: any) {
  if (update.callback_query) {
    const callbackId = update.callback_query.id;
    const callbackData = update.callback_query.data;

    // Agar bu callback allaqachon qayta ishlangan bo'lsa, skip
    if (processedCallbacks.has(callbackId)) {
      return;
    }

    await handleCallback(update.callback_query);

    // Qayta ishlangan callback ni saqlash
    processedCallbacks.add(callbackId);
  }
}

// Callback tugmasi bosilganda
async function handleCallback(callbackQuery: any) {
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

  // 3. Loading ni yo'qotish
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQuery.id,
      text: "✅ Qo'ng'iroq qilindi",
      show_alert: true,
    }),
  });

  // 4. Kanalga yuborish
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  if (channelId) {
    const now = new Date();
    const callTime = now.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const logText = `📞 QO'NG'IROQ QILINDI

👤 Admin: ${adminName}
🆔 Admin ID: ${adminId}
📞 Telefon: ${phone}
⏰ Qo'ng'iroq vaqti: ${callTime}
─────────────────`;

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

// Asosiy funksiya - registratsiyani yuborish
export async function sendTelegramMessage(user: UserData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN");
  }

  const admin = getNextAdmin();

  if (!admin) {
    throw new Error("No admins available");
  }

  const text = `📩 YANGI REGISTRATSIYA

👤 Ism: ${user.firstName} ${user.lastName}
📞 Telefon: ${user.phone}
⏰ Vaqt: ${user.timestamp}

🔔 Bu foydalanuvchi sizga biriktirildi
👤 Admin: ${admin.name}`;

  const callbackData = `${admin.id}|${user.phone}`;

  const body = {
    chat_id: Number(admin.id),
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📞 Qo'ng'iroq qilindi",
            callback_data: callbackData,
          },
        ],
      ],
    },
  };

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    if (!res.ok || !data.ok) {
      console.error("❌ Telegram API error:", data);
      throw new Error(data.description || "Telegram message failed");
    }

    return { success: true, adminId: admin.id, adminName: admin.name };
  } catch (error) {
    console.error("❌ Xatolik:", error);
    throw error;
  }
}

// Pollingni avtomatik boshlash
if (typeof window === "undefined") {
  setTimeout(() => {
    startPolling();
  }, 1000);
}
