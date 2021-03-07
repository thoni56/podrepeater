<template>
  <v-container>
    <v-list>
      <Episode
        v-for="e in repeats"
        :key="e.id"
        :episode-item="e"
        :playing-episode-id="playingEpisodeId"
        :playing="playing"
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

const audio = new Audio();

export default {
  components: { Episode },
  props: {
    repeats: { type: Array, default: () => [] }
  },
  data() {
    return {
      playing: false,
      playingEpisodeId: 0
    };
  },
  methods: {
    unselectEpisode(episodeItem) {
      this.$emit("episode-unselected", episodeItem);
    },
    playNextEpisode() {
      const episodeItem = this.repeats.find(e => e.id == this.playingEpisodeId);
      const index = this.repeats.indexOf(episodeItem);
      const next = (index + 1) % this.repeats.length;
      this.play(this.repeats[next].id);
    },
    play(id) {
      if (id == this.playingEpisodeId) {
        if (this.playing) {
          this.playing = false;
          audio.pause();
        } else {
          audio.play();
          this.playing = true;
        }
      } else {
        if (this.playing) audio.pause();
        const episodeItem = this.repeats.find(e => e.id == id);
        this.playingEpisodeId = id;
        audio.src = episodeItem.audio;
        audio.onended = this.playNextEpisode;
        audio.play();
        this.playing = true;
        setTimeout(tick, 500);
      }
    }
  }
};

function tick() {
  setTimeout(tick, 500);
}
</script>

<style></style>
