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
  // Remember where it came from
  podcast.episodes.forEach(episode => {
    // There is no id in podcast-parser data about episodes so we use the link
    episode.id = episode.link;
    episode.rss = podcastItem.rssUrl;
  });
  return podcast.episodes;
}

async function fetchEpisode(rss, id) {
  const podcast = await getPodcastFromURL(rss);
  let episode = undefined;
  podcast.episodes.forEach(e => {
    // There is no id in podcast-parser data about episodes so we use the link
    if (e.link == id) {
      e.id = id;
      e.rss = rss;
      episode = e;
    }
  });
  return episode;
}

export { fetchPodcasts, fetchEpisodes, fetchEpisode };
