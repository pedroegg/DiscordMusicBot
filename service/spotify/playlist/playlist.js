//TODO: No método Playlist, serializar o json transformando em uma struct

function User(api, id, ok, fail) {
  api
    .getUserPlaylists(id)
    .then((data) => ok(data.body.items))
    .catch((error) => fail(error));
}

function Tracks(api, id, ok, fail) {
  api
    .getPlaylistTracks(id)
    .then((data) => ok(data.body.items))
    .catch((error) => fail(error));
}

function Playlist(api, id, ok, fail) {
  api
    .getPlaylist(id)
    .then((data) => ok(data.body))
    .catch((error) => fail(error));
}

function Search(api, query, ok, fail) {
  api
    .getSearchPlaylists(query)
    .then((data) => ok(data.body.playlists))
    .catch((error) => fail(error));
}

module.exports = {
  Playlist,
  User,
  Tracks,
  Search,
};
