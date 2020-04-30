//TODO: Serializar os jsons transformando em uma struct

function Artist(api, id, ok, fail) {
  api
    .getArtist(id)
    .then(({ body }) => ok(body))
    .catch((error) => fail(error));
}

function RelatedArtists(api, id, ok, fail) {
  api
    .getArtistRelatedArtists(id)
    .then(({ body }) => ok(body))
    .catch((error) => fail(error));
}

function TopTracks(api, id, ok, fail) {
  api
    .getArtistTopTracks(id)
    .then(({ body }) => ok(body.items))
    .catch((error) => fail(error));
}

function Search(api, query, ok, fail) {
  api
    .searchArtists(query)
    .then(({ body }) => ok(body.artists))
    .catch((error) => fail(error));
}

module.exports = {
  Artist,
  RelatedArtists,
  TopTracks,
  Search,
};
