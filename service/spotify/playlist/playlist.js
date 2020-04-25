//TODO: No método Playlist, serializar o json transformando em uma struct

function Name(api, id, ok, fail) {
  api
    .getPlaylist(id)
    .then(data => ok(data.body.name))
    .catch(error => fail(error));
}

function User(api, id, ok, fail) {}

function Image(api, id, ok, fail) {}

function Tracks(api, id, ok, fail) {
  api
    .getPlaylistTracks(id)
    .then(data => ok(data.body.items))
    .catch(error => fail(error));
}

function Playlist(api, id, ok, fail) {
  api
    .getPlaylist(id)
    .then(data => ok(data.body))
    .catch(error => fail(error));
}

module.exports = {
  Playlist,
  Image,
  Name,
  User,
  Tracks
};
