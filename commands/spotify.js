require("dotenv").config();
const api = require("../service/spotify/api");
const apiFunctions = require("../service/spotify/api").Functions;

function playlistHandler(chatChannel, playlistID) {
  api.Get(
    apiFunctions.playlist,
    playlistID,
    (data) => retrieveMusicNamesMessage(data, (list) => chatChannel.send(list)),
    (err) => {
      chatChannel.send("Error: Unable to get information about the playlist");

      console.log(err);
    },
  );
}

function trackHandler(chatChannel, trackID) {
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

module.exports = {
  name: process.env.PREFIX + "spotify",
  description: "Spotify Search and Play!",
  execute(query, voiceChannel, chatChannel, args, parts) {
    if (parts) {
      const option = parts.pathname.split("/");

      const spotifyHandlers = {
        playlist: playlistHandler,
        track: trackHandler,
      };

      return spotifyHandlers[option[1]](chatChannel, option[2]);
    } else {
      //Implementar para buscar aqui playlists de um profile, dados, etc, pois talvez não vão ser links
      chatChannel.send("Error! Invalid Spotify link.");
    }
  },
};