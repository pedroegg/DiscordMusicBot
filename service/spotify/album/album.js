//TODO: Serializar os jsons transformando em uma struct

function Album(api, id, ok, fail) {
  api
    .getAlbum(id)
    .then(({ body }) => ok(body))
    .catch((error) => fail(error));
}

function Tracks(api, id, ok, fail) {
  api
    .getAlbumTracks(id)
    .then(({ body }) => ok(body.items))
    .catch((error) => fail(error));
}

function Search(api, query, ok, fail) {
  api
    .searchAlbums(query)
    .then(({ body }) => ok(body.albums))
    .catch((error) => fail(error));
}

function Artist(api, id, ok, fail) {
  api
    .getArtistAlbums(id)
    .then(({ body }) => ok(body))
    .catch((error) => fail(error));
}

module.exports = {
  Album,
  Tracks,
  Search,
  Artist,
};
