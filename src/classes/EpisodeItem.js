function get(html, name) {
  console.log(name);
  const elements = html.getElementsByTagName(name);
  if (elements) {
    return elements[0].innerHTML;
  } else {
    return "";
  }
}

class EpisodeItem {
  constructor(item) {
    if (item.children) {
      // RSS data
      try {
        this.id = get(item, "guid");
        this.title = get(item, "title");
        this.description = get(item, "description");
        this.image = get(item, "itunes:image");
        this.season = item.season;
        this.episodeType = get(item, "itunes:episodeType");
        if (this.episodeType == "full") {
          this.episode = get(item, "itunes:episode");
        } else {
          this.episode = 0;
        }
        this.published = get(item, "pubdate");
        this.audio = get(item, "enclosure");
        this.duration = get(item, "itunes:duration");
      } catch (error) {
        console.error(error);
      }
    } else {
      // PodcastIndex data
      this.id = item.id;
      this.title = item.title;
      this.description = item.description;
      this.image = item.image != "" ? item.image : item.feedImage;
      this.season = item.season;
      this.episode = item.episode;
      this.episodeType = item.episodeType;
      this.published = item.datePublished;
      this.audio = item.enclosureUrl;
      this.duration = item.duration;
    }
  }
}

module.exports = { EpisodeItem };
