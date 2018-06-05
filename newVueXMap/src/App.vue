<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'assets/scss/common.scss';

  html,
  body{
    height: 100%;
  }
  #app{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    min-width: 1024px;
    max-width: 100%;
    height: 100%;
  }
</style>
