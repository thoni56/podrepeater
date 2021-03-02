<template>
  <v-app>
    <v-container>
      <v-tabs grow v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="Podcasts">
          <Podcasts @podcast-selected="onPodcastSelected" ref="podcasts" />
        </v-tab-item>
        <v-tab-item key="Episodes">
          <Episodes
            @episode-selected="onEpisodeSelected"
            :podcastItem="podcastItem"
            ref="episodes"
          />
        </v-tab-item>
        <v-tab-item key="Repeats">
          <Repeats ref="repeats" />
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

export default {
  components: {
    Podcasts,
    Episodes,
    Repeats,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      tab: 0,
      items: ["Podcasts", "Episodes", "Repeats"],
      podcastId: 0,
      selectedPodcastItem: PodcastItem,
    };
  },
  computed: {
    podcastItem() {
      return this.selectedPodcastItem;
    },
  },
  methods: {
    onPodcastSelected: function(podcastItem) {
      this.tab = 1; // Episodes
      this.selectedPodcastItem = podcastItem;
    },
    onEpisodeSelected: function(episodeId) {
      console.log(episodeId);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
