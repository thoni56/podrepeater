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
      <Podcast
        v-for="p in podcasts"
        :key="p.id"
        :podcastItem="p"
        @selected="onSelected"
      />
    </v-container>
  </v-container>
</template>

<script>
import Podcast from "./Podcast.vue";
import PodcastItem from "../classes/PodcastItem.js";
import { PodcastIndexEnv } from "../../podcastindex_env.js";
import sha1 from "sha1";

let view = this;

export default {
  components: {
    Podcast,
  },
  data: function() {
    return {
      searchString: "",
      podcasts: [],
    };
  },
  methods: {
    doSearch: function() {
      const searchTerm = encodeURIComponent(
        this.searchString.replace(" ", "+")
      );
      fetchPodcasts(searchTerm).then((data) => {
        view = this;
        view.podcasts = [];
        populatePodcasts(data);
      });
    },
    onSelected: function(podcastId) {
      this.$emit("selected", podcastId);
    },
  },
};

const searchUrl = "https://api.podcastindex.org/api/1.0/search/byterm?q=";

function populatePodcasts(data) {
  const matches = data.feeds;
  for (const value of matches.values()) {
    view.podcasts.push(new PodcastItem(value));
  }
}

function createHeaders() {
  // From Podcast Index API example
  let apiKey = PodcastIndexEnv.PODCASTINDEX_KEY;
  let apiSecret = PodcastIndexEnv.PODCASTINDEX_SECRET;
  // ======== Hash them to get the Authorization token ========
  let apiHeaderTime = Math.floor(Date.now() / 1000);
  const data2Hash = apiKey + apiSecret + apiHeaderTime;
  const sha = sha1(data2Hash).toString();
  return {
    // not needed right now, maybe in future:  "Content-Type": "application/json",
    "X-Auth-Date": apiHeaderTime.toString(),
    "X-Auth-Key": apiKey,
    Authorization: sha,
    "User-Agent": "PodRepeater/0.0",
  };
}

async function fetchPodcasts(term) {
  const response = await fetch(searchUrl + term, {
    method: "get",
    headers: createHeaders(),
  });
  return response.json();
}
</script>

<style></style>
