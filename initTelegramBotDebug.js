// telegramListener.js
const { Telegraf } = require("telegraf");
const Config = require("./config");


/**
 * Initializes Telegram bot listener to log user chat details.
 * @param {boolean} enableListener - Toggle listener on/off
 */
function initTelegramListener(enableListener = true) {
    const botToken = Config.telegram_bot_token;
  if (!botToken) {
    console.error("[Telegram Bot] No BOT_TOKEN provided!");
    return;
  }

  const bot = new Telegraf(botToken);

  if (enableListener) {
    // Triggered when user sends /start
    bot.start((ctx) => {
      const chat = ctx.chat;
      console.log("[Telegram Bot] User chat info:", chat);

      // TODO: Save chat info to DB for future notifications
      // Example:
      // saveUserChatId(chat.id, chat.first_name, chat.username);

      ctx.reply(`Hello ${chat.first_name}, thank you for starting the bot!`);
    });

    // Optional: listen to any text message
    bot.on("text", (ctx) => {
      const chat = ctx.chat;
      console.log("[Telegram Bot] Message from user:", chat, "Message:", ctx.message.text);
    });
  }

  // Start polling
  bot.launch().then(() => {
    console.log("[Telegram Bot] Listener is running...");
  }).catch((err) => {
    console.error("[Telegram Bot] Failed to launch bot:", err);
  });
}

module.exports = { initTelegramListener };
