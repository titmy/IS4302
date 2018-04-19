<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss"> // Apply the theme
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(red, A700), // The primary color of your application
  // accent: md-get-palette-color(white, A200), // The accent or secondary color
  theme: light
));

@import "~vue-material/dist/theme/all";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
}

.page-container {
  height: 100%;
}

.md-app {
  height: 100%;
}
</style>
