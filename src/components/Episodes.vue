<template>
  <v-container>
    <v-card v-if="podcastItem">
      <Podcast :podcast-item="podcastItem" />
    </v-card>

    <v-container style="max-height:100vh" class="overflow-y-auto">
      <v-list>
        <Episode
          v-for="e in sortedEpisodes()"
          :key="e.id"
          :episode-item="e"
          action="add"
          @selected="onSelected"
        />
      </v-list>
    </v-container>
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
    },
    sortedEpisodes() {
      return [...this.episodes].sort((e1, e2) => {
        if (e1.order && e2.order) {
          if (e1.order < e2.order) return -1;
          if (e1.order > e2.order) return 1;
          return 0;
        } else {
          const d1 = Date.parse(e1.pubDate);
          const d2 = Date.parse(e2.pubDate);
          if (d1 < d2) return -1;
          if (d1 > d2) return 1;
          return 0;
        }
      });
    }
  }
};
</script>

<style></style>
