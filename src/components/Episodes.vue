<template>
  <v-container>
    <v-card v-if="podcastItem">
      <Podcast :podcast-item="podcastItem" />
    </v-card>

    <v-container>
      <Episode
        v-for="e in episodes"
        :key="e.id"
        :episode-item="e"
        @selected="onSelected"
      />
    </v-container>
  </v-container>
</template>

<script>
import Podcast from "./Podcast.vue";
import PodcastItem from "../classes/PodcastItem";
import Episode from "./Episode.vue";
import EpisodeItem from "../classes/EpisodeItem.js";
import { PodcastIndexEnv } from "../../podcastindex_env.js";
import sha1 from "sha1";

let view = this;

export default {
  components: {
    Podcast,
    Episode
  },
  props: {
    podcastItem: { type: PodcastItem, default: null }
  },
  data: function() {
    return {
      episodes: []
    };
  },
  mounted() {
    this.populate(this.podcastItem);
  },
    this.populate(this.podcastItem);
  },
  methods: {
    populate: function(podcastItem) {
      fetchEpisodes(podcastItem.id).then(data => {
        view = this;
        view.episodes = [];
        populateEpisodes(data);
      });
    },
    onSelected: function(episodeId) {
      this.$emit("episode-selected", episodeId);
    }
  }
};

const episodesUrl =
  "https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=";

function populateEpisodes(data) {
  const episodes = data.items;
  episodes.reverse();
  for (const episode of episodes.values()) {
    view.episodes.push(new EpisodeItem(episode));
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
    "User-Agent": "PodRepeater/0.0"
  };
}

async function fetchEpisodes(id) {
  const response = await fetch(episodesUrl + id, {
    method: "get",
    headers: createHeaders()
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}
</script>

<style></style>
