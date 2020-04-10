require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const comandosBot = require("./comandos");

const hosts = {
  "open.spotify.com": "Spotify",
  "youtube.com": "Youtube",
};
const TOKEN_DISCORD = process.env.TOKEN_DISCORD;

Object.keys(comandosBot).map((key) => {
  bot.commands.set(comandosBot[key].name, comandosBot[key]);
});

bot.login(TOKEN_DISCORD);

bot.on("ready", () => {
  console.log("Pronto!");
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const comando = args.shift().toLowerCase();

  if (!bot.commands.has(comando)) return;

  try {
    try {
      const url = new URL(args[0]);

      if (hosts[url.host] != "") {
        let parts = {
          host: url.host,
          pathname: url.pathname,
          searchParams: url.searchParams,
          href: url.href,
        };

        bot.commands.get(comando).execute(msg, args, parts);
      }
    } catch (error) {
      //It's not a url
      bot.commands.get(comando).execute(msg, args, null);
    }
  } catch (error) {
    console.error(error);
  }
});
