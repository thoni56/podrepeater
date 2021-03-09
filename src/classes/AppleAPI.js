import { EpisodeItem } from "./EpisodeItem";

const searchUrl = "https://itunes.apple.com/search?media=podcast&term=";

async function fetchPodcasts(term) {
  const response = await fetch(searchUrl + term);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response.json().then(data => data.results);
}

// TODO Convert to read RSS-feeds for the id using Apple lookup(id)

async function fetchEpisodes(podcastItem) {
  const response = await fetch(podcastItem.rssUrl)
    .then(data =>
      data.text().then(text => {
        const doc = new window.DOMParser().parseFromString(text, "text/xml");
        const items = doc.getElementsByTagName("item");
        items.forEach(item => new EpisodeItem(item));
      })
    )
    .catch(() =>
      console.error("Error fetching episodes from RSS " + podcastItem.rssUrl)
    );
}

function populateEpisodes(data) {
  const items = [].slice.call(data);
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
