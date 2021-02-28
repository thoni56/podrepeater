<template>
  <v-card>
    <div class="d-flex no-wrap">
      <v-avatar tile class="ma-1" size="125">
        <v-img :src="podcastItem.image"> </v-img>
      </v-avatar>
      <div class="text-left" v-on:click="read">
        <v-card-title class="pt-0">{{ podcastItem.title }}</v-card-title>
        <v-card-subtitle> {{ truncatedDescription() }}</v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: { podcastItem: {} },
  methods: {
    read: function() {
      console.log(this.podcastItem.title);
    },
    truncatedDescription() {
      return this.podcastItem.description.substring(0, 190) + "...";
    },
  },
};
</script>

<style></style>
