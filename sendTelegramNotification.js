// sendTelegramNotification.js
const { Telegraf } = require("telegraf");
const Config = require("./config");

// Replace with your bot token
const bot = new Telegraf(Config.telegram_bot_token);

// Hardcoded chat ID for admin notifications
const CHAT_ID = Config.admin_chatid;

/**
 * Send Telegram notification
 * @param {string} message - The message to send
 */
const sendTelegramNotification = async (message) => {
  try {
    await bot.telegram.sendMessage(CHAT_ID, message, { parse_mode: "HTML" });
    console.log("[Telegram] Notification sent successfully");
  } catch (error) {
    console.error("[Telegram] Failed to send notification:", error);
  }
};

module.exports = { sendTelegramNotification };
