const ytdl = require("ytdl-core");
const youtube = require("../service/youtube/youtube");
const spotify = require("../service/spotify/api");
const spotifyFunctions = require("../service/spotify/api").Functions;

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
    let arrayPathname = parts.pathname.split("/");

    if (arrayPathname[1] == "playlist") {
      spotifyPlaylistHandler(msg, arrayPathname[2]);
    }
    if (arrayPathname[1] == "track") {
      spotifyTrackHandler(msg, arrayPathname[2]);
    }
    if (arrayPathname[1] == "artist") {
    }
    if (arrayPathname[1] == "album") {
    }
  }

  if (parts.host == "Youtube") {
    playAudio(msg, ytdl.getURLVideoID(args[0]));
  }
}

function spotifyPlaylistHandler(msg, playlistID) {
  spotify.Get(
    spotifyFunctions.playlist,
    playlistID,
    (data) => spotifyRetrieveMusicNamesMessage(data, (list) => msg.reply(list)),
    (err) => console.log(err)
  );
}

function spotifyTrackHandler(msg, trackID) {
  spotify.Get(
    spotifyFunctions.track,
    trackID,
    function (data) {
      youtube.search(`${data.name} ${data.artists[0].name}`, function (music) {
        msg.reply(
          `:musical_note: Now playing: ${data.name} - ${data.artists[0].name} :fire:`
        );
        playAudio(msg, youtube.getVideoId(music));
      });
    },
    (err) => console.log(err)
  );
}

function spotifyRetrieveMusicNamesMessage(data, callback) {
  var nameList = "```\nMusics in the playlist '" + data.name + "':\n\n";

  data.tracks.items.forEach(function (element, i) {
    nameList += `${i} - ${element.track.name} - ${element.track.artists[0].name}\n`;
  });

  callback(nameList + "```");
}

module.exports = {
  name: process.env.PREFIX + "play",
  description: "Play music",
  execute(msg, args, parts) {
    play(parts, msg, args, this.name);
  },
};
