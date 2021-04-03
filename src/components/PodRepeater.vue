<template>
  <v-app>
    <v-container>
      <v-tabs v-model="tab" grow>
        <v-tab v-for="tabName in tabNames" :key="tabName">
          <v-badge
            v-if="tabName == 'Repeats' && currentRepeatCount > 0"
            :content="currentRepeatCount"
          >
            {{ tabName }}
          </v-badge>
          <span v-else> {{ tabName }} </span>
        </v-tab>
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
            ref="repeatsComponent"
            @repeats-count-updated="onRepeatsCountUpdated"
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
import { fetchEpisodes, fetchEpisode } from "../classes/AppleAPI";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default {
  components: {
    Podcasts,
    Episodes,
    Repeats
  },
  data() {
    return {
      tab: {
        type: Number,
        default: 0
      },
      tabNames: ["Podcasts", "Episodes", "Repeats"],
      selectedPodcastItem: PodcastItem,
      currentRepeats: [],
      currentRepeatCount: 0,
      episodes: []
    };
  },
  computed: {
    podcastItem() {
      return this.selectedPodcastItem;
    }
  },
  created() {
    this.setTab(2); // Set to repeats tab to render and populate this.$refs
  },
  mounted() {
    this.setTab(0); // Set to podcasts tab since that's where we start
  },
  methods: {
    onPodcastSelected(podcastItem) {
      this.selectedPodcastItem = podcastItem;
      this.populateEpisodes(podcastItem);
      this.setTab(1); // Episodes tab
    },
    onEpisodeSelected(episodeItem) {
      this.currentRepeats.push(episodeItem);
      this.$refs.repeatsComponent.addRepeatingEpisode(episodeItem);
    },
    onRepeatsCountUpdated(count) {
      this.currentRepeatCount = count;
    },
    setTab(id) {
      this.tab = id;
    },
    populateEpisodes(podcastItem) {
      this.episodes.splice(0, this.episodes.length); // Empty episodes list in a Vue compatible manner
      fetchEpisodes(podcastItem).then(episodes => {
        episodes.forEach(episode => {
          this.episodes.push(episode);
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped></style>
