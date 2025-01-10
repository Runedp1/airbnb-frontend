<template>
  <div id="app">
    <router-view></router-view> <!-- This loads the current page dynamically -->
  </div>
</template>

<script>
export default {
  name: 'App',
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

  /* Add light green background */
  background-color: #d4f5d5; /* Light green color */
  min-height: 100vh; /* Ensure it covers the full height of the viewport */
  margin: 0; /* Remove default margin to make it consistent */
}


</style>