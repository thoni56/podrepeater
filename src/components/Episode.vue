<template>
  <v-card elevation="5">
    <div class="d-flex flex-no-wrap">
      <v-avatar tile class="ma-1" size="125">
        <v-img :src="episodeItem.image"> </v-img>
      </v-avatar>
      <div class="text-left">
        <v-card-title class="pt-0">
          <div class="headerClass">
            {{ episodeItem.title }}
          </div>
        </v-card-title>
        <v-card-subtitle v-html="episodeItem.description"></v-card-subtitle>
        <v-card-actions>
          <v-btn class="ml-2 mt-3" fab icon height="40px" right width="40px">
            <v-icon>mdi-play</v-icon>
          </v-btn></v-card-actions
        >
      </div>
    </div>
  </v-card>
</template>

<script>
import EpisodeItem from "../classes/EpisodeItem.js";

export default {
  props: {
    episodeItem: EpisodeItem
  },
  methods: {
    truncatedDescription() {
      return this.episodeItem.description.substring(0, 190) + "...";
    },
    select() {
      this.$emit("selected", this.episodeItem);
    }
  }
};
</script>

<style>
.headerClass {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
