<template>
  <v-container>
    <v-list>
      <Episode
        v-for="e in repeats"
        :key="e.id"
        :episode-item="e"
        :playing-episode-id="playingEpisodeId"
        :playing="playing"
        :progress="currentProgress"
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
      playingEpisodeId: 0,
      progress: 0
    };
  },
  computed: {
    currentProgress() {
      return this.progress;
    }
  },
  methods: {
    unselectEpisode(episodeItem) {
      if (this.playingEpisodeId == episodeItem.id) {
        this.play(this.playingEpisodeId);
      }
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
          audio.pause();
          this.playing = false;
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
        setTimeout(this.tick, 200);
      }
    },
    tick() {
      this.progress = (audio.currentTime / audio.duration) * 100;
      setTimeout(this.tick, 200);
    }
  }
};
</script>

<style></style>
