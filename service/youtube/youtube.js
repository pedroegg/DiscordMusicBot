const fetch = require("node-fetch");

function search(query, data) {
  let linkYoutubeApi =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=" +
    query +
    "&key=" +
    process.env.YOUTUBE_TOKEN;

  fetch(linkYoutubeApi)
    .then((response) => {
      if (!response) {
        throw new Error("Video not found!");
      }

      return response.json();
    })
    .then((videoInfo) => {
      if (videoInfo.totalResults == 0) {
        throw new Error("Video does not exist");
      }

      data(videoInfo);
    })
    .catch((err) => console.log(err));
}

function getVideoId(data) {
  if (!data.items[0].id.videoId) {
    throw new Error("Could not take video id");
  }

  return data.items[0].id.videoId;
}

function getVideoName(data) {
  if (!data.items[0].snippet.title) {
    throw new Error("Could not take video name");
  }

  return data.items[0].snippet.title;
}

module.exports = {
  search,
  getVideoId,
};
