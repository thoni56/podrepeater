<template>
  <v-container>
    <v-app>
      <v-tabs icons-and-text grow>
        <v-tab>Podcasts</v-tab>
        <v-tab>Episodes</v-tab>
        <v-tab>Repeats</v-tab>
      </v-tabs>
    </v-app>
    <v-tabs-items>
      <t-tabs-item>
        <podcasts> </podcasts>
      </t-tabs-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  name: "PodRepeater",
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
