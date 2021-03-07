require("dotenv").config();
const api = require("../service/spotify/api");
const apiFunctions = require("../service/spotify/api").Functions;

module.exports = {
  name: process.env.PREFIX + "spotify",
  description: "Spotify Search and Play!",
  execute(msg, args, parts) {
    if (parts) {
      const option = parts.pathname.split("/");

      const spotifyHandlers = {
        playlist: playlistHandler,
        track: trackHandler,
      };

      return spotifyHandlers[option[1]](msg, option[2]);
    } else {
      //Implementar para buscar aqui playlists de um profile, dados, etc, pois talvez não vão ser links
      msg.reply("Error! Invalid Spotify link.");
    }
  },
};

function playlistHandler(msg, playlistID) {
  api.Get(
    apiFunctions.playlist,
    playlistID,
    (data) => retrieveMusicNamesMessage(data, (list) => msg.reply(list)),
    (err) => console.log(err)
  );
}

function trackHandler(msg, trackID) {
  api.Get(
    apiFunctions.track,
    trackID,
    (data) => console.log(data),
    (err) => console.log(err)
  );
}

function retrieveMusicNamesMessage(data, callback) {
  var nameList = "```\nMusics in the playlist '" + data.name + "':\n\n";

  data.tracks.items.forEach(function (element, i) {
    nameList += `${i} - ${element.track.name} - ${element.track.artists[0].name}\n`;
  });

  callback(nameList + "```");
}
