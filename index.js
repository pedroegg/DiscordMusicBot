require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const validUrl = require("valid-url");
const express = require('express');
const app = express();

const hosts = {
  "open.spotify.com": "Spotify",
  "youtube.com": "Youtube",
  "www.youtube.com": "Youtube",
  "m.youtube.com": "Youtube",
};

function Channel(chan, acceptReply) {
  this.acceptReply = acceptReply;
  this.send = function(message) {
    if (this.acceptReply) {
      return chan.reply(message);
    }

    return chan.send(message);
  }
}

const TOKEN_DISCORD = process.env.TOKEN_DISCORD;

var EggersServerID = null;
var EggersBotChannel = null;
var EggMemberID = null;

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(TOKEN_DISCORD);

bot.on("ready", () => {
  console.log("Discord Bot Ready!");

  let servers = bot.guilds.cache;

  servers.some(server => {
    if (server.name == 'Eggers') {
      EggersServerID = server.id;

      let channels = server.channels.cache;

      channels.some(channel => {
        if (channel.name == 'bots') {
          EggersBotChannel = channel;
          return true;
        }
      });
      
      return true;
    }
  });
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  const query = msg.content.replace(command, "");
  const voiceChannel = msg.member.voice.channel;
  const chatChannel = new Channel(msg, true);

  if (!bot.commands.has(command)) return;

  try {
    isUrl(args, (parts) => {
      bot.commands.get(command).execute(query, voiceChannel, chatChannel, args, parts);
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

app.post('/search', (req, res) => {
  let EggVoiceChannel = null;

  if (EggMemberID === null) {
    let members = bot.guilds.cache.get(EggersServerID).members.cache;

    members.some(member => {
      if (member.nickname == 'Pedro Egg') {
        EggMemberID = member.id;
        EggVoiceChannel = member.voice.channel;
        return true;
      }
    });
  } else {
    EggVoiceChannel = bot.guilds.cache.get(EggersServerID).members.cache.get(EggMemberID).voice.channel;
  }

  if (EggVoiceChannel === null) {
    if (EggersBotChannel !== null) {
      EggersBotChannel.send('Something went wrong! @PedroEgg, are you really connected to a voice chat?');

      res.status(404).send({
        message: 'You are not connected to a voice chat',
        error: 'true',
      });
    } else {
      console.log('Something went wrong!');

      res.status(500).send({
        message: 'Something went wrong!',
        error: 'true',
      });
    }
  }

  try {
    bot.commands.get('?play').execute(req.query.q, EggVoiceChannel, new Channel(EggersBotChannel, false), null, null);
  } 
  catch (error) {
    EggersBotChannel.send('Something went wrong! :(');
    console.error(error);
  }

  res.status(200).send({
    message: 'Message successfully sent',
    error: 'false',
  });
});

app.listen(3000, () => console.log('API -> Port 3000'));
