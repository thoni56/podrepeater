<template>
  <v-container>
    <v-card>
      <v-card-title>Podcasts</v-card-title>
      <v-text-field
        v-model="searchString"
        label="Search for podcasts"
        single-line
        hide-details
        append-icon="search"
        v-on:keyup.enter="doSearch"
      >
      </v-text-field>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      searchString: "",
    };
  },
  methods: {
    doSearch: function () {
      console.log(this.searchString);
    },
  },
};
</script>

<style>
</style>
