<template>
  <v-card v-on:click="select">
    <div class="d-flex no-wrap">
      <v-avatar tile class="ma-1" size="125">
        <v-img :src="episodeItem.image"> </v-img>
      </v-avatar>
      <div class="text-left">
        <v-card-title class="pt-0">{{ episodeItem.title }}</v-card-title>
        <v-card-subtitle v-html="truncatedDescription()"></v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: { episodeItem: {} },
  methods: {
    truncatedDescription() {
      return this.episodeItem.description.substring(0, 190) + "...";
    },
  },
};
</script>

<style></style>
