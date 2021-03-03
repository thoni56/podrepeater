<template>
  <v-card elevation="5" @click="select">
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
