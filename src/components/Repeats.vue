<template>
  <v-container>
    <Episode
      v-for="e in repeats"
      :key="e.id"
      :episode-item="e"
      @selected="unselectEpisode"
    />
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
    unselectEpisode() {
      console.log("Episode unselected");
    }
  }
};
</script>

<style></style>
