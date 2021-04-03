<template>
  <v-container>
    <v-list style="max-height:100vh" class="overflow-y-auto">
      <Episode
        v-for="e in currentRepeats"
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
import { fetchEpisode } from "../classes/AppleAPI.js";

const audio = new Audio();

export default {
  components: { Episode },
  data() {
    return {
      currentRepeats: [],
      playing: false,
      playingEpisodeItem: null,
      time: 0,
      progress: 0
    };
  },
  computed: {
    currentProgress() {
      return this.progress;
    }
  },
  created() {
    const state = JSON.parse(localStorage.getItem("podrepeats"));
    this.reloadRepeats(state);
  },
  methods: {
    repeatCountUpdated() {
      this.$emit("repeats-count-updated", this.currentRepeats.length);
    },
    addRepeatingEpisode(episodeItem) {
      this.currentRepeats.push(episodeItem);
      this.repeatCountUpdated();
    },
    currentRepeatCount() {
      return this.currentRepeats.length;
    },
    unselectEpisode(episodeItem) {
      if (this.playingEpisodeItem == episodeItem) {
        this.stop();
      }
      const index = this.currentRepeats.indexOf(episodeItem);
      if (index > -1) {
        this.currentRepeats.splice(index, 1);
      }
      this.repeatCountUpdated();
    },
    playNextEpisode() {
      const episodeItem = this.currentRepeats.find(
        e => e == this.playingEpisodeItem
      );
      const index = this.currentRepeats.indexOf(episodeItem);
      const next = (index + 1) % this.currentRepeats.length;
      this.playing = false;
      this.play(this.currentRepeats[next]);
    },
    stop() {
      audio.pause();
      audio.currentTime = 0;
      this.playingEpisodeItem = null;
      this.currentTime = 0;
      this.progress = 0;
    },
    play(episodeItem) {
      if (episodeItem == this.playingEpisodeItem) {
        if (this.playing) {
          audio.pause();
          this.playing = false;
          clearTimeout(this.timer);
        } else {
          audio.play();
          this.playing = true;
          this.startTick();
        }
      } else {
        if (this.playing) audio.pause();
        const playingEpisode = this.currentRepeats.find(e => e == episodeItem);
        this.playingEpisodeItem = playingEpisode;
        audio.src = episodeItem.enclosure.url;
        audio.onended = this.playNextEpisode;
        audio.play();
        this.playing = true;
        this.startTick();
      }
    },
    startTick() {
      this.timer = setTimeout(this.tick, 666);
    },
    tick() {
      if (isNaN(audio.duration)) {
        this.progress = 0;
      } else {
        this.time = audio.currentTime;
        this.progress = (audio.currentTime / audio.duration) * 100;
      }
      this.saveState();
      this.startTick();
    },
    saveState() {
      const state = this.currentRepeats.map(r => {
        return {
          rss: r.rss,
          id: r.id,
          time: r.id == this.playingEpisodeItem.id ? this.time : 0,
          progress: this.progress
        };
      });
      localStorage.setItem("podrepeats", JSON.stringify(state));
    },
    reloadRepeats(state) {
      if (state) {
        state.forEach(episodeInfo => {
          fetchEpisode(episodeInfo.rss, episodeInfo.id).then(e => {
            if (e != undefined) {
              this.currentRepeats.push(e);
              this.repeatCountUpdated();
              if (episodeInfo.time != 0) {
                this.playingEpisodeItem = e;
                this.currentTime = episodeInfo.time;
                this.progress = episodeInfo.progress;
                audio.src = e.enclosure.url;
                audio.currentTime = this.currentTime;
                audio.onended = this.playNextEpisode;
              }
            }
          });
        });
      }
    }
  }
};
</script>

<style></style>
