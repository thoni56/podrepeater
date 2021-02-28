<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text> {{ description }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Podcast",
  data: function () {
    return {
      title: "Title of Podcast",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ut reprehenderit doloremque odit consequatur amet?",
    };
  },
};
</script>

<style></style>