<template>
  <v-container>
    <v-list>
      <Episode
        v-for="e in repeats"
        :key="e.id"
        :ref="e.id"
        :episode-item="e"
        action="remove"
        @selected="unselectEpisode"
        @ended="playNextEpisode"
      />
    </v-list>
  </v-container>
</template>

<script>
import Episode from "./Episode.vue";

export default {
  components: { Episode },
  props: {
    repeats: { type: Array, default: () => [] }
  },
  methods: {
    unselectEpisode(episodeItem) {
      this.$emit("episode-unselected", episodeItem);
    },
    playNextEpisode(id) {
      const child = this.$refs[id];
      child[0].play();
    }
  }
};
</script>

<style></style>
