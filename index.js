require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const comandosBot = require("./commands");

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
  console.log("Ready!");
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const comando = args.shift().toLowerCase();
  var parts = null;

  if (!bot.commands.has(comando)) return;
  try {
    try {
      const url = new URL(args[0]);

      if (hosts[url.host] != "") {
        parts = {
          host: url.host,
          pathname: url.pathname,
          searchParams: url.searchParams,
          href: url.href,
        };
      }
    } catch (error) {
      //It's not a url
      console.error(error);
    }

    bot.commands.get(comando).execute(msg, args, parts);
  } catch (error) {
    console.error(error);
  }
});
