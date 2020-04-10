require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const comandosBot = require("./comandos");

Object.keys(comandosBot).map(key => {
  bot.commands.set(comandosBot[key].name, comandosBot[key]);
});

const TOKEN_DISCORD = process.env.TOKEN_DISCORD;

bot.login(TOKEN_DISCORD);

bot.on("ready", () => {
  console.log("Pronto!");
});

bot.on("message", msg => {
  const args = msg.content.split(/ +/);
  const comando = args.shift().toLowerCase();

  if (!bot.commands.has(comando)) return;

  try {
    bot.commands.get(comando).execute(msg, args);
  } catch (error) {
    console.error(error);
  }
});
