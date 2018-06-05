<template>
  <div class="vbox">
    <!-- 头部 -->
    <div class="header-wrap">
      <c-header></c-header>
    </div>
    <!-- 地图和导航栏 -->
    <div class="map-tollbar-wrap" @mouseup="mousemove">
      <toolbar></toolbar>
      <v-amap></v-amap>
    </div>
    <!-- 侧边栏 -->
    <div class="list-wrap">
      <c-aside></c-aside>
    </div>
  </div>
</template>
<script>
import cHeader from '@/components/header'
import cAside from '@/components/Aside'
import toolbar from '@/components/Toolbar'
import vAmap from '@/components/Amap'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {cHeader, cAside, vAmap, toolbar},
  name: 'hello',
  data () {
    return {}
  },
  watch: {
    lodingbox: function () {
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
      'Acountyr',
      'AgetRoll'
    ]),
    mousemove () {
    }
  },
  created () {
    this.Acountyr()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .vbox {
    position: relative;
    width: 100%;
    height: 100%;
    background: $white;
    @include clearfix;
  }
  .header-wrap {
    width: 100%;
    height: 60px;
  }
  .map-tollbar-wrap {
    position: relative;
    width: calc(100% - 350px);
    height: calc(100% - 60px);
    float: left;
    @include clearfix;
  }
  .list-wrap {
    position: relative;
    width: 350px;
    height: calc(100% - 60px);
    float: right;
    @include clearfix;
  }
</style>
