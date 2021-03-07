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
import { fetchEpisodesFromPodcastIndex } from "../classes/PodcastIndex";
import EpisodeItem from "../classes/EpisodeItem";

let view = this;

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
    populate(podcastItem) {
      fetchEpisodesFromPodcastIndex(podcastItem.id).then(data => {
        view = this;
        view.episodes = [];
        populateEpisodes(data.items);
      });
    },
    onSelected(episodeItem) {
      this.$emit("episode-selected", episodeItem);
    }
  }
};

function populateEpisodes(data) {
  const episodes = data.items;
  episodes.reverse();
  for (const episode of episodes.values()) {
    view.episodes.push(new EpisodeItem(episode));
  }
}
</script>

<style></style>
