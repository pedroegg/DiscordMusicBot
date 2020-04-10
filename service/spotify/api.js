//TODO: Fazer o init ser singleton por chamada de módulo, fazer o module.exports funcionar direito e
//fazer antes de usar a api, checar se já deu a validade da key e gerar uma nova.
//A idéia era fazer esse init ser executado automaticamente assim que houvesse algum import desse módulo
//Reduzir também todos esses if e elses das funções de playlist para somente um.

//Ou então fazer o getToken ser executado sempre que for usar a api, e então esse arquivo será deletado

const Playlist = require("./playlist/playlist");
const SpotifyWebApi = require("spotify-web-api-node");
var api = undefined;

function init(callback) {
  if (api == undefined || api == null) {
    console.log("GetToken");
    getApiToken(
      function(obj) {
        api = obj;
        callback();
      },
      err => console.log(err)
    );
  } else {
    callbackFail("Invalid API Token!");
  }
}

function getPlaylistName(id, callbackOk, callbackFail) {
  if (api != undefined && api != null) {
    Playlist.Name(api, id, callbackOk, callbackFail);
  } else {
    callbackFail("Invalid API Token!");
  }
}

function getPlaylistsUser(id, callbackOk, callbackFail) {
  if (api != undefined && api != null) {
    Playlist.User(api, id, callbackOk, callbackFail);
  } else {
    callbackFail("Invalid API Token!");
  }
}

function getPlaylistImage(id, callbackOk, callbackFail) {
  if (api != undefined && api != null) {
    Playlist.Image(api, id, callbackOk, callbackFail);
  } else {
    callbackFail("Invalid API Token!");
  }
}

function getPlaylistTracks(id, callbackOk, callbackFail) {
  if (api != undefined && api != null) {
    Playlist.Tracks(api, id, callbackOk, callbackFail);
  } else {
    callbackFail("Invalid API Token!");
  }
}

function getPlaylist(id, callbackOk, callbackFail) {
  if (api != undefined && api != null) {
    Playlist.Playlist(api, id, callbackOk, callbackFail);
  } else {
    callbackFail("Invalid API Token!");
  }
}

function getApiToken(callbackOk, callbackFail) {
  const clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
  });

  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      //console.log("The access token expires in " + data.body["expires_in"]);
      console.log(data.body["access_token"]);
      spotifyApi.setAccessToken(data.body["access_token"]);
      callbackOk(spotifyApi);
    },
    function(err) {
      callbackFail(`Ocorreu algum erro ao tentar pegar o token! Erro: ${err}`);
    }
  );
}

/*export default {
    init
}*/

module.exports = {
  init,
  getPlaylistImage,
  getPlaylistName,
  getPlaylistsUser,
  getPlaylistTracks,
  getPlaylist
};
