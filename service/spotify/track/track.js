//TODO: Serializar os jsons transformando em uma struct

function Track(api, id, ok, fail) {
  api
    .getTrack(id)
    .then((data) => ok(data.body))
    .catch((error) => fail(error));
}

function Search(api, query, ok, fail) {
  api
    .searchTracks(query)
    .then((data) => ok(data.body.tracks))
    .catch((error) => fail(error));
}

module.exports = {
  Track,
  Search,
};
