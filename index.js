require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const validUrl = require("valid-url");

const hosts = {
  "open.spotify.com": "Spotify",
  "youtube.com": "Youtube",
  "www.youtube.com": "Youtube",
  "m.youtube.com": "Youtube",
};

const TOKEN_DISCORD = process.env.TOKEN_DISCORD;

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(TOKEN_DISCORD);

bot.on("ready", () => {
  console.log("Ready!");
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) return;

  try {
    isUrl(args, (parts) => {
      bot.commands.get(command).execute(msg, args, parts);
    });
  } catch (error) {
    console.error(error);
  }
});

function isUrl(args, callback) {
  let parts = null;

  if (!args) {
    return;
  }

  if (validUrl.isUri(args[0])) {
    const url = new URL(args[0]);

    if (hosts[url.host]) {
      parts = {
        host: hosts[url.host],
        pathname: url.pathname,
        searchParams: url.searchParams,
        href: url.href,
      };
    }
  }

  callback(parts);
}
