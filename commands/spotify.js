require("dotenv").config();
const api = require("../service/spotify/api");

module.exports = {
  name: process.env.PREFIX + "spotify",
  description: "Spotify Search and Play!",
  execute(msg, args) {
    api.init(function() {
      api.getPlaylist(
        args[0],
        data => retrieveMusicNames(data, list => msg.reply(list)),
        err => console.log(err)
      );
    });
  }
};

function retrieveMusicNames(data, callback) {
  var nameList = "```\nMusics in the playlist '" + data.name + "':\n\n";

  data.tracks.items.forEach(function(element, i) {
    nameList += `${i} - ${element.track.name} - ${element.track.artists[0].name}\n`;
  });

  callback(nameList + "```");
}
