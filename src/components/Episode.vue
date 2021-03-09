<template>
  <div>
    <v-list-item three-line ripple class="text-left">
      <div>
        <v-list-item-avatar tile class="ma-1" size="125">
          <v-img :src="episodeItem.imageURL"> </v-img>
          <v-overlay :absolute="true" :opacity="0" :value="isCurrentEpisode">
            <v-progress-circular
              :value="progress"
              size="80"
              width="9"
              color="red"
              rotate="270"
            ></v-progress-circular>
          </v-overlay>
        </v-list-item-avatar>
      </div>
      <v-list-item-content class="pt-0">
        <v-list-item-title>
          {{ episodeItem.title }}
        </v-list-item-title>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-subtitle
              style="margin-top:-20px"
              v-bind="attrs"
              v-on="on"
              v-html="episodeItem.description"
            >
            </v-list-item-subtitle>
          </template>
          <div class="text-left">
            <span>{{ stripHtmlFrom(episodeItem.description) }}</span>
          </div>
        </v-tooltip>
        <div>
          <span v-if="episodeItem.season" class="caption font-italic">
            Season {{ episodeItem.season }}
          </span>
          <span v-if="episodeItem.episode" class="caption font-italic">
            Episode {{ episodeItem.episode }}
          </span>
          <span class="caption">{{ publishDate() }}</span>
          <span style="float:right">{{ duration() }}</span>
        </div>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn class="mt-0 pt-0" fab height="30px" width="30px" @click="select">
          <v-icon v-if="action == 'add'">mdi-plus</v-icon>
          <v-icon v-if="action == 'remove'">mdi-minus</v-icon>
        </v-btn>
        <v-btn
          v-if="action == 'remove'"
          class="mt-1"
          fab
          height="30px"
          width="30px"
          @click="play"
        >
          <v-icon v-if="isPlaying">mdi-pause</v-icon>
          <v-icon v-else>mdi-play</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    episodeItem: undefined,
    action: { type: String, default: "" },
    playingEpisodeItem: undefined,
    playing: { type: Boolean, default: false },
    progress: { type: Number, default: 0 }
  },
  computed: {
    isPlaying() {
      return this.playingEpisodeItem == this.episodeItem && this.playing;
    },
    isCurrentEpisode() {
      return this.playingEpisodeItem == this.episodeItem;
    }
  },
  methods: {
    select() {
      this.$emit("selected", this.episodeItem);
    },
    play() {
      this.$emit("play", this.episodeItem);
    },
    publishDate() {
      return new Date(
        Date.parse(this.episodeItem.pubDate)
      ).toLocaleDateString();
    },
    duration() {
      if (this.episodeItem.duration == 0) {
        return "";
      } else {
        return new Date(this.episodeItem.duration * 1000)
          .toISOString()
          .substr(11, 8);
      }
    },
    stripHtmlFrom(html) {
      let doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
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
