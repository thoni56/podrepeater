<template>
  <v-container>
    <v-list>
      <Episode
        v-for="e in repeats"
        :key="e.id"
        :ref="e.id"
        :episode-item="e"
        action="remove"
        @selected="unselectEpisode"
        @play="play"
        @ended="playNextEpisode"
      />
    </v-list>
  </v-container>
</template>

<script>
import Episode from "./Episode.vue";

let playingEpisodeId = 0;

export default {
  components: { Episode },
  props: {
    repeats: { type: Array, default: () => [] }
  },
  methods: {
    unselectEpisode(episodeItem) {
      this.$emit("episode-unselected", episodeItem);
    },
    playNextEpisode() {
      const episode = this.$refs[playingEpisodeId];
      episode.playing = false;
      const episodeItem = this.repeats.find(e => (e.id = playingEpisodeId));
      const index = this.repeats.indexOf(episodeItem);
      const next = index + (1 % this.repeats.length);
      this.play(this.repeats[next].id);
    },
    play(id) {
      const episode = this.$refs[id];
      const episodeItem = this.repeats.find(e => (e.id = id));
      playingEpisodeId = id;
      if (episode.playing) {
        episode.playing = false;
        this.audio.pause();
      } else {
        this.audio = new Audio(episodeItem.audio);
        this.audio.onended = this.playNextEpisode;
        this.audio.play();
        playingEpisodeId = episodeItem.id;
        episode.playing = true;
      }
    }
  }
};
</script>

<style></style>
