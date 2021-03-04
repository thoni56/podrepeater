<template>
  <v-card elevation="5" max-height="133" @click="select">
    <div class="d-flex no-wrap">
      <v-avatar tile class="ma-1" size="125">
        <v-img :src="podcastItem.image"> </v-img>
      </v-avatar>
      <div class="text-left" style="min-width:0">
        <v-card-title class="pt-0 ">
          <div class="truncated">
            {{ podcastItem.title }}
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div class="truncated">
            {{ podcastItem.author }}
          </div>
        </v-card-subtitle>
        <v-card-text>
          <span
            v-for="category in podcastItem.categories"
            :key="category"
            style="font-style: italic;"
          >
            {{ category }},
          </span>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import PodcastItem from "../classes/PodcastItem";

export default {
  props: {
    podcastItem: { type: PodcastItem, default: null }
  },
  methods: {
    select() {
      this.$emit("selected", this.podcastItem);
    }
  }
};
</script>

<style>
.truncated {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
