<template>
  <v-container>
    <v-card elevation="5">
      <v-card-title>Podcasts</v-card-title>
      <v-container>
        <v-text-field
          v-model="searchString"
          label="Search for podcasts"
          single-line
          hide-details
          append-icon="search"
          @keyup.enter="doSearch"
        >
        </v-text-field>
      </v-container>
    </v-card>
    <v-container>
      <Podcast
        v-for="p in podcasts"
        :key="p.id"
        :podcast-item="p"
        @selected="onSelected"
      />
    </v-container>
  </v-container>
</template>

<script>
import Podcast from "./Podcast.vue";
import PodcastItem from "../classes/PodcastItem.js";
import { fetchPodcastsFromPodcastIndex } from "../classes/PodcastIndex.js";

let view = this;

export default {
  components: {
    Podcast
  },
  data() {
    return {
      searchString: "",
      podcasts: []
    };
  },
  methods: {
    doSearch() {
      const searchTerm = encodeURIComponent(
        this.searchString.replace(" ", "+")
      );
      fetchPodcastsFromPodcastIndex(searchTerm).then(data => {
        view = this;
        view.podcasts = [];
        populatePodcastsFromPodcastIndex(data);
      });
    },
    onSelected(podcastItem) {
      this.$emit("podcast-selected", podcastItem);
    }
  }
};

function populatePodcastsFromPodcastIndex(data) {
  const feeds = data.feeds;
  for (const feed of feeds.values()) {
    view.podcasts.push(new PodcastItem(feed));
  }
}
</script>

<style></style>
