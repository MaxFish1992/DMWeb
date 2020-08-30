<template>
  <div id="app">
    <!-- <img :src="imgSrc" width="100%" height="100%" alt="" /> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  imgSrc:require('./assets/images/wxjz.jpg')
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -8px;
  margin-left: -8px;
}
</style>
