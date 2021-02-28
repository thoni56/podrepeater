module.exports = class PodcastItem {
  constructor(item) {
    this.title = item.title;
    this.description = item.description;
    this.image = item.artwork;
  }
};
