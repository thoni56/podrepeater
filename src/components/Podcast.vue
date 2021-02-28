<template>
  <v-card v-on:click="select">
    <div class="d-flex no-wrap">
      <v-avatar tile class="ma-1" size="125">
        <v-img :src="podcastItem.image"> </v-img>
      </v-avatar>
      <div class="text-left">
        <v-card-title class="pt-0">{{ podcastItem.title }}</v-card-title>
        <v-card-subtitle> {{ truncatedDescription() }}</v-card-subtitle>
        <v-card-text>
          <span
            style="font-style: italic;"
            v-for="category in podcastItem.categories"
            :key="category"
          >
            {{ category }},
          </span>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: { podcastItem: {} },
  methods: {
    select: function() {
      this.$emit("selected", this.podcastItem.id);
    },
    truncatedDescription() {
      return this.podcastItem.description.substring(0, 190) + "...";
    },
  },
};
</script>

<style></style>
