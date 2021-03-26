<template>
  <v-container>
    <v-list style="max-height:100vh" class="overflow-y-auto">
      <Episode
        v-for="e in repeats"
        :key="e.guid"
        :episode-item="e"
        :playing-episode-item="playingEpisodeItem"
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
      playingEpisodeItem: null,
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
      if (this.playingEpisodeItem == episodeItem) {
        this.play(this.playingEpisodeItem);
      }
      this.$emit("episode-unselected", episodeItem);
    },
    playNextEpisode() {
      const episodeItem = this.repeats.find(e => e == this.playingEpisodeItem);
      const index = this.repeats.indexOf(episodeItem);
      const next = (index + 1) % this.repeats.length;
      this.playing = false;
      this.play(this.repeats[next]);
    },
    play(episodeItem) {
      if (episodeItem == this.playingEpisodeItem) {
        if (this.playing) {
          audio.pause();
          this.playing = false;
        } else {
          audio.play();
          this.playing = true;
        }
      } else {
        if (this.playing) audio.pause();
        const playingEpisode = this.repeats.find(e => e == episodeItem);
        this.playingEpisodeItem = playingEpisode;
        audio.src = episodeItem.enclosure.url;
        audio.onended = this.playNextEpisode;
        audio.play();
        this.playing = true;
        setTimeout(this.tick, 200);
      }
    },
    tick() {
      if (isNaN(audio.duration)) {
        this.progress = 0;
      } else {
        this.progress = (audio.currentTime / audio.duration) * 100;
      }
      setTimeout(this.tick, 200);
    }
  }
};
</script>

<style></style>
