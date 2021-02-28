module.exports = class PodcastItem {
  constructor(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
};
