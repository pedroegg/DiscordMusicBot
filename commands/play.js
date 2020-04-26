const ytdl = require("ytdl-core");
const youtube = require("../service/youtube/youtube");

function playAudio(msg, videoId) {
  let voiceChannel = msg.member.voice.channel;

  if (!voiceChannel) {
    return msg.reply("You are not on a channel!");
  }

  voiceChannel
    .join()
    .then((connection) => {
      stream = ytdl("https://www.youtube.com/watch?v=" + videoId, {
        filter: "audioonly",
      });

      dispatcher = connection.play(stream);
    })
    .catch((err) => console.error(err));
}

function play(parts, msg, args, commandName) {
  if (!parts) {
    let music = msg.content.replace(commandName, "");
    youtube.search(music, (data) => {
      msg.reply(youtube.getVideoName(data));
      playAudio(msg, youtube.getVideoId(data));
    });
    return;
  }

  if (parts.host == "Spotify") {
    // let arrayPathname = parts.pathname.split("/");
    // if (arrayPathname[1] == "playlist") {
    //   playlistHandler(msg, arrayPathname[2], (musicName) => {
    //     youtube.search(musicName, (data) => {
    //       msg.reply(youtube.getVideoName(data));
    //       playAudio(msg, youtube.getVideoId(data));
    //     });
    //   });
    // }
  }

  if (parts.host == "Youtube") {
    playAudio(msg, ytdl.getURLVideoID(args[0]));
  }
}

module.exports = {
  name: process.env.PREFIX + "play",
  description: "Play music",
  execute(msg, args, parts) {
    play(parts, msg, args, this.name);
  },
};
