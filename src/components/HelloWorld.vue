<template>
  <v-app>
    <v-tabs icons-and-text>
      <v-tab>Playlist<v-icon>mdi-list</v-icon></v-tab>
      <v-tab>Episodes</v-tab>
      <v-tab>Podcasts</v-tab>
    </v-tabs>
  </v-app>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
