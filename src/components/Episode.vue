<template>
  <div>
    <v-list-item three-line ripple class="text-left">
      <v-list-item-avatar tile class="ma-1" size="125">
        <v-img :src="episodeItem.image"> </v-img>
      </v-list-item-avatar>
      <v-list-item-content class="pt-0">
        <v-list-item-title>
          {{ episodeItem.title }}
        </v-list-item-title>
        <v-list-item-subtitle v-html="episodeItem.description">
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn class="ml-0" fab height="30px" width="30px" @click="select">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
  </div>
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
