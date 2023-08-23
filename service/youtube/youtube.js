const fetch = require("node-fetch");

function search(query, data) {
  fetch('http://127.0.0.1:4000/searchQuery?q=' + query)
    .then((response) => {
      if (!response) {
        throw new Error("Video not found!");
      }

      return response.json();
    })
    .then((videoInfo) => {
      if (!videoInfo.videoFounded) {
        throw new Error("Video does not exist");
      }

      data(videoInfo);
    })
    .catch((err) => console.log(err));
}

function searchByURL(url, data) {
  fetch('http://127.0.0.1:4000/searchURL?url=' + url)
  .then((response) => {
    if (!response) {
      throw new Error("Video not found!");
    }

    return response.json();
  })
  .then((videoInfo) => {
    if (!videoInfo.videoFounded) {
      throw new Error("Video does not exist");
    }

    data(videoInfo);
  })
  .catch((err) => console.log(err));
}

module.exports = {
  search,
  searchByURL,
};
