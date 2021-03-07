<template>
  <v-container>
    <v-card v-if="podcastItem">
      <Podcast :podcast-item="podcastItem" />
    </v-card>

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
        if (e1.season == e2.season) {
          if (e1.episode == e2.episode) {
            return compare(e1.published, e2.published);
          }
          return compare(e1.episode, e2.episode);
        }
        return compare(e1.season, e2.season);
      });
    }
  }
};
function compare(e1, e2) {
  if (e1 < e2) {
    return -1;
  }
  if (e1 < e2) {
    return 1;
  }
  return 0;
}
</script>

<style></style>
