<template>
  <v-app>
    <v-tabs grow v-model="tab">
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      <v-tab-item v-for="item in items" :key="item">
        {{ item }}
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
export default {
  name: "PodRepeater",
  props: {
    msg: String,
  },
  data() {
    return {
      tab: 0,
      items: ["Podcasts", "Episodes", "Repeats"],
    };
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
