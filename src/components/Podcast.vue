<template>
  <v-card>
    <div class="d-flex no-wrap">
      <v-avatar tile class="ma-1" size="125">
        <v-img :src="image"> </v-img>
      </v-avatar>
      <div class="text-left">
        <v-card-title class="pt-0">{{ title }}</v-card-title>
        <v-card-subtitle> {{ description }}</v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      image: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
      title: "Title of Podcast",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ut reprehenderit doloremque odit consequatur amet? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ut reprehenderit doloremque odit consequatur amet?",
    };
  },
};
</script>

<style></style>