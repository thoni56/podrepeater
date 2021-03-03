<template>
  <v-container>
    <v-list>
      <Episode
        v-for="e in repeats"
        :key="e.id"
        :episode-item="e"
        @selected="unselectEpisode"
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
    }
  }
};
</script>

<style></style>
