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

async function fetchEpisodes(id) {
  const response = await fetch(episodesUrl + id, {
    method: "get",
    headers: createHeaders()
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

export { fetchPodcasts, fetchEpisodes };
