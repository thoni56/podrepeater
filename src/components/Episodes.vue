<template>
  <v-container>
    <v-card v-if="podcastItem">
      <Podcast :podcast-item="podcastItem" />
    </v-card>

    <v-list>
      <Episode
        v-for="e in episodes"
        :key="e.id"
        :episode-item="e"
        action="add"
        @selected="onSelected"
      />
    </v-list>
  </v-container>
</template>

<script>
import Podcast from "./Podcast.vue";
import PodcastItem from "../classes/PodcastItem";
import Episode from "./Episode.vue";

export default {
  components: {
    Podcast,
    Episode
  },
  props: {
    podcastItem: PodcastItem,
    episodes: { type: Array, default: () => [] }
  },
  methods: {
    onSelected(episodeItem) {
      this.$emit("episode-selected", episodeItem);
    }
  }
};
</script>

<style></style>
