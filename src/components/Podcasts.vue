<template>
  <v-container>
    <v-card>
      <v-card-title>Podcasts</v-card-title>
      <v-container>
        <v-text-field
          v-model="searchString"
          label="Search for podcasts"
          single-line
          hide-details
          append-icon="search"
          v-on:keyup.enter="doSearch"
        >
        </v-text-field>
      </v-container>
    </v-card>
    <v-container>
      <Podcast v-for="p in podcasts" :key="p" />
    </v-container>
  </v-container>
</template>

<script>
import Podcast from "./Podcast.vue";

export default {
  components: {
    Podcast,
  },
  data: function () {
    return {
      searchString: "",
      podcasts: [],
    };
  },
  methods: {
    doSearch: function () {
      this.podcasts.push(new Podcast());
    },
  },
};
</script>

<style>
</style>
