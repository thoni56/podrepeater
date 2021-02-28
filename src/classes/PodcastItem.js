module.exports = class PodcastItem {
  constructor(item) {
    this.title = item.title;
  }

  getTitle() {
    return this.title;
  }
};
