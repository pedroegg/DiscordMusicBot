const ytdl = require("ytdl-core");
const youtube = require("../service/youtube/youtube");
const spotify = require("../service/spotify/api");
const spotifyFunctions = require("../service/spotify/api").Functions;
const Queue = require("../service/queue/queue");

function play(query, voiceChannel, chatChannel, args, parts) {
  if (!parts) {
    Queue.Add(function () {
      youtubeNameHandler(query, voiceChannel, chatChannel);
    });

    return youtube.search(query, (data) => {
      chatChannel.send(`Music '${youtube.getVideoName(data)}' added to the Queue!`);
    });
  }

  if (parts.host === "Youtube") {
    Queue.Add(function () {
      youtubeLinkHandler(voiceChannel, chatChannel, args);
    });

    return youtubeNameFromLink(
      args[0],
      (title) => chatChannel.send(`Music '${title}' added to the Queue!`),
      (err) => {
        chatChannel.send("Error: Unable to get information about the track");

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

    return spotifyHandlers[option[1]](voiceChannel, chatChannel, option[2]);
  }
}

function youtubeNameHandler(query, voiceChannel, chatChannel) {
  youtube.search(query, (data) => {
    playAudio(
      voiceChannel,
      youtube.getVideoId(data),
      (dispatcher, connection) => {
        chatChannel.send(`:musical_note: Now playing: ${youtube.getVideoName(data)} :fire:`);

        Queue.setCurrentDispatcher(dispatcher);
        Queue.setCurrentConnection(connection);
        observeDispatcher(chatChannel);
      },
      (err) => {
        chatChannel.send("Error: Music play failed!");

        console.error(err);
      }
    );
  });
}

function youtubeLinkHandler(voiceChannel, chatChannel, args) {
  playAudio(
    voiceChannel,
    ytdl.getURLVideoID(args[0]),
    (dispatcher, connection) => {
      youtubeNameFromLink(
        args[0],
        (title) => {
          chatChannel.send(`:musical_note: Now playing: ${title} :fire:`);

          Queue.setCurrentDispatcher(dispatcher);
          Queue.setCurrentConnection(connection);
          observeDispatcher(chatChannel);
        },
        (err) => {
          chatChannel.send("Error: Unable to get information about the track");

          console.error(err);
        }
      );
    },
    (err) => {
      chatChannel.send("Error: Music play failed!");

      console.error(err);
    }
  );
}

function spotifyPlaylistHandler(voiceChannel, chatChannel, playlistID) {
  spotify.Get(
    spotifyFunctions.playlist,
    playlistID,
    (data) => {
      spotifyAddMusicsPlaylist(data, voiceChannel, chatChannel, (list) => chatChannel.send(list));
    },
    (err) => {
      chatChannel.send("Error: Unable to get information about the playlist");

      console.log(err);
    },
  );
}

function spotifyTrackHandler(voiceChannel, chatChannel, trackID) {
  spotify.Get(
    spotifyFunctions.track,
    trackID,
    (data) => {
      const music = `${data.name} ${data.artists[0].name}`;

      Queue.Add(function () {
        youtubeNameHandler(music, voiceChannel, chatChannel);
      });

      youtube.search(music, (dataYt) => chatChannel.send(`Music '${youtube.getVideoName(dataYt)}' added to the Queue!`));
    },
    (err) => {
      chatChannel.send("Error: Unable to get information about the track");

      console.log(err);
    },
  );
}

function playAudio(voiceChannel, videoId, callbackOk, callbackFail) {
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

function spotifyAddMusicsPlaylist(data, voiceChannel, chatChannel, callback) {
  //let nameList = "```\nAdded musics in the playlist '" + data.name + "':\n\n";

  data.forEach(function (element, i) {
    //nameList += `${i} - ${element.track.name} - ${element.track.artists[0].name}\n`;

    Queue.Add(function () {
      youtubeNameHandler(
        `${element.track.name} ${element.track.artists[0].name}`,
        voiceChannel,
        chatChannel,
      );
    });
  });

  callback("Added " + data.length + " musics to the queue!:thumbsup:");
}

function observeDispatcher(chatChannel) {
  Queue.getCurrentDispatcher().on("finish", () => {
    if (Queue.Length() == 0) {
      Queue.getCurrentConnection().disconnect();
      Queue.Clear();
    } else {
      Queue.Skip((err) => chatChannel.send(err));
    }
  });

  Queue.getCurrentDispatcher().on("error", (e) => {
    console.error("Erro no Dispatcher: " + e);
  });
}

function youtubeNameFromLink(link, callbackOk, callbackFail) {
  ytdl.getBasicInfo(link, (err, info) => {
    if (err) {
      callbackFail(err);
    }

    callbackOk(info.title);
  });
}

module.exports = {
  name: process.env.PREFIX + "play",
  description: "Play music",
  execute(query, voiceChannel, chatChannel, args, parts) {
    play(query, voiceChannel, chatChannel, args, parts);
  },
};
