<template>
  <v-app>
    <v-container>
      <v-tabs grow v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <component
            v-bind:is="item"
            @podcast-selected="onPodcastSelected"
            @episode-selected="onEpisodeSelected"
            ref="tab"
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
    };
  },
  methods: {
    onPodcastSelected: function(podcastId) {
      this.tab = 1; // Episodes
      this.$refs.tab[1].populate(podcastId);
    },
    onEpisodeSelected: function(episodeId) {
      console.log(episodeId);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
