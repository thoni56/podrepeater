<template>
  <v-app>
    <v-container>
      <v-tabs v-model="tab" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="Podcasts">
          <Podcasts @podcast-selected="onPodcastSelected" />
        </v-tab-item>
        <v-tab-item key="Episodes">
          <Episodes
            :episodes="episodes"
            :podcast-item="podcastItem"
            @episode-selected="onEpisodeSelected"
          />
        </v-tab-item>
        <v-tab-item key="Repeats">
          <Repeats
            :repeats="repeats"
            @episode-unselected="onEpisodeUnselected"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-app>
</template>

<script>
import Podcasts from "./Podcasts.vue";
import Episodes from "./Episodes.vue";
import Repeats from "./Repeats.vue";
import PodcastItem from "../classes/PodcastItem";
import { fetchEpisodesFromPodcastIndex } from "../classes/PodcastIndex";
import { EpisodeItem } from "../classes/EpisodeItem";

export default {
  components: {
    Podcasts,
    Episodes,
    Repeats
  },
  data() {
    return {
      tab: { type: Number, default: 0 },
      items: ["Podcasts", "Episodes", "Repeats"],
      selectedPodcastItem: PodcastItem,
      currentRepeats: [],
      episodes: []
    };
  },
  computed: {
    podcastItem() {
      return this.selectedPodcastItem;
    },
    repeats() {
      return this.currentRepeats;
    }
  },
  methods: {
    onPodcastSelected(podcastItem) {
      this.selectedPodcastItem = podcastItem;
      this.populateEpisodes(podcastItem);
      this.setTab(1); // Episodes tab
    },
    onEpisodeSelected(episodeItem) {
      this.currentRepeats.push(episodeItem);
      this.setTab(2); // Repeats tab
    },
    onEpisodeUnselected(episodeItem) {
      const index = this.currentRepeats.indexOf(episodeItem);
      if (index > -1) {
        this.currentRepeats.splice(index, 1);
      }
    },
    setTab(id) {
      this.tab = id;
    },
    pushEpisode(episodeItem) {
      this.episodes.push(episodeItem);
    },
    populateEpisodes(podcastItem) {
      this.episodes = [];
      fetchEpisodesFromPodcastIndex(podcastItem.id).then(data => {
        data.items.forEach(episode => {
          this.pushEpisode(new EpisodeItem(episode));
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
