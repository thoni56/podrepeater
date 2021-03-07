module.exports = class PodcastItem {
  constructor(item) {
    if (item.id) {
      // PodcastIndex
      this.id = item.id;
      this.title = item.title;
      this.author = item.author;
      this.description = item.description;
      this.image = item.image;
      this.categories = item.categories;
    } else {
      // Apple
      this.id = item.collectionId;
      this.title = item.collectionName;
      this.author = item.artistName;
      this.description = "";
      this.image = item.artworkUrl100;
      this.categories = item.genres;
    }
  }
};
