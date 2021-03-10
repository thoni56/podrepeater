import { getPodcastFromURL } from "podcast-feed-parser";

const searchUrl = "https://itunes.apple.com/search?media=podcast&term=";

async function fetchPodcasts(term) {
  const response = await fetch(searchUrl + term);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response.json().then(data => data.results);
}

async function fetchEpisodes(podcastItem) {
  podcastItem.rssUrl = podcastItem.rssUrl.replace("http:", "https:");
  const podcast = await getPodcastFromURL(podcastItem.rssUrl);
  return podcast.episodes;
}

export { fetchPodcasts, fetchEpisodes };
