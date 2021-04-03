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
            ref="repeats"
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
      episodes: []
    };
  },
  computed: {
    podcastItem() {
      return this.selectedPodcastItem;
    },
    currentRepeatCount() {
      return this.currentRepeats.length;
    },
    repeats() {
      return this.currentRepeats;
    }
  },
  created() {
    const x = this.reloadRepeats(JSON.parse(this.$cookies.get("podrepeats")));
  },
  methods: {
    onPodcastSelected(podcastItem) {
      this.selectedPodcastItem = podcastItem;
      this.populateEpisodes(podcastItem);
      this.setTab(1); // Episodes tab
    },
    onEpisodeSelected(episodeItem) {
      this.currentRepeats.push(episodeItem);
      this.setCookies();
      this.$refs.repeats.addRepeatingEpisode(episodeItem);
    },
    onEpisodeUnselected(episodeItem) {
      const index = this.currentRepeats.indexOf(episodeItem);
      if (index > -1) {
        this.currentRepeats.splice(index, 1);
      }
      this.setCookies();
    },
    setTab(id) {
      this.tab = id;
    },
    setCookies() {
      const cookies = this.currentRepeats.map(r => {
        return { rss: r.rss, id: r.id };
      });
      this.$cookies.set("podrepeats", JSON.stringify(cookies));
    },
    populateEpisodes(podcastItem) {
      this.episodes.splice(0, this.episodes.length); // Empty episodes list in a Vue compatible manner
      fetchEpisodes(podcastItem).then(episodes => {
        episodes.forEach(episode => {
          this.episodes.push(episode);
        });
      });
    },
    reloadRepeats(episodeCookies) {
      if (episodeCookies) {
        episodeCookies.forEach(episodeInfo => {
          fetchEpisode(episodeInfo.rss, episodeInfo.id).then(e => {
            if (e != undefined) {
              this.currentRepeats.push(e);
            }
          });
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped></style>
