<template>
  <div id="app">
    <PodRepeater />
  </div>
</template>

<script>
import PodRepeater from "./components/PodRepeater.vue";

export default {
  name: "App",
  components: {
    PodRepeater,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
