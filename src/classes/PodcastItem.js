module.exports = class PodcastItem {
  constructor(item) {
    this.id = item.id;
    this.title = item.title;
    this.description = item.description;
    this.image = item.image;
    this.categories = item.categories;
  }
};
