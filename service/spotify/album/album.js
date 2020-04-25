//TODO: Serializar os jsons transformando em uma struct

function Album(api, id, ok, fail) {
  api
    .getAlbum(id)
    .then((data) => ok(data.body))
    .catch((error) => fail(error));
}

function Tracks(api, id, ok, fail) {
  api
    .getAlbumTracks(id)
    .then((data) => ok(data.body.items))
    .catch((error) => fail(error));
}

function Search(api, query, ok, fail) {
  api
    .searchAlbums(query)
    .then((data) => ok(data.body))
    .catch((error) => fail(error));
}

function Artist(api, id, ok, fail) {
  api
    .getArtistAlbums(id)
    .then((data) => ok(data.body))
    .catch((error) => fail(error));
}

module.exports = {
  Album,
  Tracks,
  Search,
  Artist,
};
