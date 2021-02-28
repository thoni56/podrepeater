<template>
  <v-card>
    <div class="d-flex no-wrap">
      <v-avatar tile class="ma-1" size="125">
        <v-img :src="image"> </v-img>
      </v-avatar>
      <div class="text-left" v-on:click="read">
        <v-card-title class="pt-0">{{ podcastItem.title }}</v-card-title>
        <v-card-subtitle> {{ description }}</v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: { podcastItem: {} },
  data: function() {
    return {
      image: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ut reprehenderit doloremque odit consequatur amet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ut reprehenderit doloremque odit consequatur amet?",
    };
  },
  methods: {
    read: function() {
      console.log(this.podcastItem.title);
    },
  },
};
</script>

<style></style>
