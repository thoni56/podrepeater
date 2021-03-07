class EpisodeItem {
  constructor(item) {
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

module.exports = { EpisodeItem };
