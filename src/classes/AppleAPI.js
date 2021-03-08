const searchUrl = "https://itunes.apple.com/search?media=podcast&term=";

import { PodcastIndexEnv } from "../../podcastindex_env";
import sha1 from "sha1";

const createHeaders = () => {
  // From Podcast Index API example
  let apiKey = PodcastIndexEnv.PODCASTINDEX_KEY;
  let apiSecret = PodcastIndexEnv.PODCASTINDEX_SECRET;
  // ======== Hash them to get the Authorization token ========
  let apiHeaderTime = Math.floor(Date.now() / 1000);
  const data2Hash = apiKey + apiSecret + apiHeaderTime;
  const sha = sha1(data2Hash).toString();
  return {
    // not needed right now, maybe in future:  "Content-Type": "application/json",
    "X-Auth-Date": apiHeaderTime.toString(),
    "X-Auth-Key": apiKey,
    Authorization: sha,
    "User-Agent": "PodRepeater/0.0"
  };
};

async function fetchPodcasts(term) {
  const response = await fetch(searchUrl + term);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response.json().then(data => data.results);
}

// TODO Convert to read RSS-feeds for the id using Apple lookup(id)
const episodesUrl =
  "https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=";

async function fetchEpisodes(podcastItem) {
  const response = await fetch(podcastItem.rssUrl)
    .then(data => data.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => populateEpisodes(data.getElementsByTagName("item")));
}

function populateEpisodes(data) {
  const items = [].slice.call(data);
  items.reverse();
  items.forEach(item => {
    const title = item.getElementsByTagName("title")[0].textContent;
    const image = item
      .getElementsByTagName("itunes:image")[0]
      .getAttribute("href");
    let description = item.getElementsByTagName("itunes:subtitle");
    if (description && description.length > 0)
      description = description[0].textContent;
    else description = "";
    let season = item.getElementsByTagName("itunes:season");
    if (season && season.length > 0)
      season = "Season " + season[0].textContent + " : ";
    else season = "";
    let episode = item.getElementsByTagName("itunes:episode");
    if (episode && episode.length > 0)
      episode = "Episode " + episode[0].textContent;
    else episode = "";
    let episodeType = item.getElementsByTagName("itunes:episodeType");
    if (episodeType && episodeType.length > 0)
      episodeType = episodeType[0].textContent;
    else episodeType = "";
    if (episode === "" && episodeType != "") episode = episodeType;
    let pubDate = item.getElementsByTagName("pubDate");
    pubDate = new Date(pubDate[0].innerHTML);
    const formattedDate =
      pubDate.getFullYear() +
      "-" +
      (pubDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      pubDate
        .getDate()
        .toString()
        .padStart(2, "0");
  });
}

export { fetchPodcasts, fetchEpisodes };
