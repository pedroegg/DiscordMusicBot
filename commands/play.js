const ytdl = require("ytdl-core");
const youtube = require("../service/youtube/youtube");
const spotify = require("../service/spotify/api");
const spotifyFunctions = require("../service/spotify/api").Functions;
const Queue = require("../service/queue/queue");

function play(parts, msg, args, commandName) {
  if (!parts) {
    const music = msg.content.replace(commandName, "");

    Queue.Add(function () {
      youtubeNameHandler(music, msg);
    });

    return youtube.search(music, (data) =>
      msg.reply(`Music '${youtube.getVideoName(data)}' added to the Queue!`)
    );
  }

  if (parts.host === "Youtube") {
    Queue.Add(function () {
      youtubeLinkHandler(msg, args);
    });

    return youtubeNameFromLink(
      args[0],
      (title) => msg.reply(`Music '${title}' added to the Queue!`),
      (err) => {
        msg.reply("Error: Unable to get information about the track");
        console.error(err);
      }
    );
  }

  if (parts.host === "Spotify") {
    const option = parts.pathname.split("/");

    const spotifyHandlers = {
      playlist: spotifyPlaylistHandler,
      track: spotifyTrackHandler,
    };

    return spotifyHandlers[option[1]](msg, option[2]);
  }
}

function youtubeNameHandler(musicName, msg) {
  youtube.search(musicName, (data) => {
    playAudio(
      msg,
      youtube.getVideoId(data),
      (dispatcher, connection) => {
        msg.reply(
          `:musical_note: Now playing: ${youtube.getVideoName(data)} :fire:`
        );

        Queue.setCurrentDispatcher(dispatcher);
        Queue.setCurrentConnection(connection);
        observeDispatcher(msg);
      },
      (err) => {
        msg.reply("Error: Music play failed!");
        console.error(err);
      }
    );
  });
}

function youtubeLinkHandler(msg, args) {
  playAudio(
    msg,
    ytdl.getURLVideoID(args[0]),
    (dispatcher, connection) => {
      youtubeNameFromLink(
        args[0],
        (title) => {
          msg.reply(`:musical_note: Now playing: ${title} :fire:`);

          Queue.setCurrentDispatcher(dispatcher);
          Queue.setCurrentConnection(connection);
          observeDispatcher(msg);
        },
        (err) => {
          msg.reply("Error: Unable to get information about the track");
          console.error(err);
        }
      );
    },
    (err) => {
      msg.reply("Error: Music play failed!");
      console.error(err);
    }
  );
}

function spotifyPlaylistHandler(msg, playlistID) {
  spotify.Get(
    spotifyFunctions.playlist,
    playlistID,
    (data) => {
      spotifyAddMusicsPlaylist(data, msg, (list) => msg.reply(list));
    },
    (err) => console.log(err)
  );
}

function spotifyTrackHandler(msg, trackID) {
  spotify.Get(
    spotifyFunctions.track,
    trackID,
    (data) => {
      const music = `${data.name} ${data.artists[0].name}`;

      Queue.Add(function () {
        youtubeNameHandler(music, msg);
      });

      youtube.search(music, (dataYt) =>
        msg.reply(`Music '${youtube.getVideoName(dataYt)}' added to the Queue!`)
      );
    },
    (err) => console.log(err)
  );
}

function playAudio(msg, videoId, callbackOk, callbackFail) {
  const voiceChannel = msg.member.voice.channel;

  if (!voiceChannel) {
    callbackFail("You are not on a channel!");
  }

  voiceChannel
    .join()
    .then((connection) => {
      stream = ytdl("https://www.youtube.com/watch?v=" + videoId, {
        filter: "audioonly",
      });

      const dispatcher = connection.play(stream);
      callbackOk(dispatcher, connection);
    })
    .catch((err) => callbackFail(err));
}

function spotifyAddMusicsPlaylist(data, msg, callback) {
  let nameList = "```\nAdded musics in the playlist '" + data.name + "':\n\n";

  data.tracks.items.forEach(function (element, i) {
    nameList += `${i} - ${element.track.name} - ${element.track.artists[0].name}\n`;

    Queue.Add(function () {
      youtubeNameHandler(
        `${element.track.name} ${element.track.artists[0].name}`,
        msg
      );
    });
  });

  callback(nameList + "```");
}

function observeDispatcher(msg) {
  Queue.getCurrentDispatcher().on("finish", () => {
    if (Queue.Length() == 0) {
      Queue.getCurrentConnection().disconnect();

      return Queue.setActive(false);
    }

    Queue.Skip((err) => msg.reply(err));
  });

  Queue.getCurrentDispatcher().on("error", (e) => console.error(e));
}

function youtubeNameFromLink(link, callbackOk, callbackFail) {
  ytdl.getBasicInfo(link, (err, info) => {
    if (err) {
      callbackFail(err);
    }

    callbackOk(info.title);
  });
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
    (data) => {
      youtube.search(`${data.name} ${data.artists[0].name}`, (music) => {
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
