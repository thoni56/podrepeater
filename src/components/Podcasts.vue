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
    <v-container style="max-height:100vh" class="overflow-y-auto">
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
import { fetchPodcasts } from "../classes/AppleAPI.js";

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
      fetchPodcasts(searchTerm).then(items => {
        view = this;
        view.podcasts.splice(0); // Clear array in a Vue-compatible way
        populatePodcasts(items);
      });
    },
    onSelected(podcastItem) {
      this.$emit("podcast-selected", podcastItem);
    }
  }
};

function populatePodcasts(feeds) {
  for (const feed of feeds.values()) {
    view.podcasts.push(new PodcastItem(feed));
  }
}
</script>

<style></style>
