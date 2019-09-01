const Telegraf = require("telegraf");
const settings = require("./config/settings");
const { token } = require("./config/token");

const bot = new Telegraf(token, settings.options);

bot.start(ctx => ctx.reply("Welcome"));

const { getFlow } = require("../server/service/file");
const { connectWizardScenes } = require("./service/scenes");

let flow = getFlow().flow;
connectWizardScenes(bot, flow);

bot.on("text", ctx => {
  ctx.reply("Try /scene1");
});

function startBot() {
  bot.launch();
  console.log("Bot started!");
  bot.telegram.sendMessage(116570554, "Bot started!");
}

module.exports = {
  startBot
};
