require("dotenv").config();
const api = require("../service/spotify/api");

module.exports = {
  name: process.env.PREFIX + "spotify",
  description: "Spotify Search and Play!",
  execute(msg, args, parts) {
    if (parts != null) {
      let arrayPathname = parts.pathname.split("/");

      if (arrayPathname[1] == "playlist") {
        playlistHandler(msg, arrayPathname[2]);
      }
    } else {
      //Implementar para buscar aqui playlists de um profile, dados, etc, pois talvez não vão ser links
      msg.reply("Error! Invalid Spotify link.");
    }
  },
};

function playlistHandler(msg, playlistID) {
  api.init(function () {
    api.getPlaylist(
      playlistID,
      (data) => retrieveMusicNames(data, (list) => msg.reply(list)),
      (err) => console.log(err)
    );
  });
}

function retrieveMusicNames(data, callback) {
  var nameList = "```\nMusics in the playlist '" + data.name + "':\n\n";

  data.tracks.items.forEach(function (element, i) {
    nameList += `${i} - ${element.track.name} - ${element.track.artists[0].name}\n`;
  });

  callback(nameList + "```");
}
