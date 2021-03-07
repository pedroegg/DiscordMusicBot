//TODO: Fazer o init ser singleton por chamada de módulo, fazer o module.exports funcionar direito e
//fazer antes de usar a api, checar se já deu a validade da key e gerar uma nova.
//A idéia era fazer esse init ser executado automaticamente assim que houvesse algum import desse módulo
//Reduzir também todos esses if e elses das funções de playlist para somente um.

//Ou então fazer o getToken ser executado sempre que for usar a api, e então esse arquivo será deletado
//Colocar o tipo de elementos das funções e seus tipos de retorno, para ficar "tipado"

const Playlist = require("./playlist/playlist");
const Album = require("./album/album");
const Track = require("./track/track");
const Artist = require("./artist/artist");

const SpotifyWebApi = require("spotify-web-api-node");

const Functions = {
  playlistsUser: Playlist.User,
  playlistTracks: Playlist.Tracks,
  playlist: Playlist.Playlist,
  album: Album.Album,
  albumTracks: Album.Tracks,
  albums: Album.Search,
  artistAlbums: Album.Artist,
  track: Track.Track,
  tracks: Track.Search,
  artist: Artist.Artist,
  relatedArtists: Artist.RelatedArtists,
  artistTopTracks: Artist.TopTracks,
  artists: Artist.Search,
};

function Get(funct, param, callbackOk, callbackFail) {
  getApiToken((api) => {
    funct(api, param, callbackOk, callbackFail);
  }, callbackFail);
}

function getApiToken(callbackOk, callbackFail) {
  const clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(
    (data) => {
      //console.log("The access token expires in " + data.body["expires_in"]);
      console.log(data.body["access_token"]);
      spotifyApi.setAccessToken(data.body["access_token"]);
      callbackOk(spotifyApi);
    },
    (err) => {
      callbackFail(`Ocorreu algum erro ao tentar pegar o token! Erro: ${err}`);
    }
  );
}

module.exports = {
  Get,
  Functions,
};
