//TODO: Serializar os jsons transformando em uma struct

function Artist(api, id, ok, fail) {
  api
    .getArtist(id)
    .then((data) => ok(data.body))
    .catch((error) => fail(error));
}

function RelatedArtists(api, id, ok, fail) {
  api
    .getArtistRelatedArtists(id)
    .then((data) => ok(data.body))
    .catch((error) => fail(error));
}

function TopTracks(api, id, ok, fail) {
  api
    .getArtistTopTracks(id)
    .then((data) => ok(data.body.items))
    .catch((error) => fail(error));
}

function Search(api, query, ok, fail) {
  api
    .searchArtists(query)
    .then((data) => ok(data.body.artists))
    .catch((error) => fail(error));
}

module.exports = {
  Artist,
  RelatedArtists,
  TopTracks,
  Search,
};
