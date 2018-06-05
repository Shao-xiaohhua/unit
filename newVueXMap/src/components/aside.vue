<template>
  <div class="cebianlan">
    <!-- inner toolbar -->
    <inner-toolbar></inner-toolbar>
    <!-- 区县 -->
    <div class="rout-box">
      <div class="country-box" :class="{hind: !ZoneSwite}">
        <country></country>
      </div>
      <!-- 街道 -->
      <div class="str-box" :class="{active: StrSwite, 'aactive': DetSwite}">
        <street></street>
      </div>
      <!-- 详情 -->
      <div class="detail-box" :class="{active: DetSwite}">
        <list-detail></list-detail>
      </div>
      <!-- 加载动画 -->
      <div class="login-box" :class="{active: loginSwite}">
        <div class="iner-wrap">
          <div class="spinner">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>
<script>
  import innerToolbar from '@/components/innerToolbar'
  import country from '@/components/country'
  import street from '@/components/street'
  import listDetail from '@/components/list-detail'
  import VIscroll from 'viscroll'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: { VIscroll, innerToolbar, country, street, listDetail },
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    computed: {
      ...mapGetters([
        'routSwit',
        'ZoneSwite',
        'StrSwite',
        'DetSwite',
        'loginSwite'
      ])
    },
    watch: {
      routSwit () {
        if (this.routSwit) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    },
    methods: {
      ...mapActions([
      ]),
      hoverCityOver () {
      },
      hoverCityOut () {
      },
      aab () {
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .cebianlan {
    position: relative;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .rout-box {
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
  }
  // 路由动画
  .child-view {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-100%, 0);
  }
  .country-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform .3s ease;
  }
 .country-box.hind {
  transform: translate3D(-100%, 0, 0);
 }
 .str-box {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform .3s ease;
}
.str-box.active {
  transform: translate3D(-100%, 0, 0);
}
.str-box.aactive {
  transform: translate3D(-200%, 0, 0);
}
.detail-box {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform .3s ease;
}
.detail-box.active {
  transform: translate3D(-100%, 0, 0);
}
.login-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 888888;
  display: none;
  .iner-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &.active {
    display: block;
  }
}
.spinner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 60px;
  height: 60px;
}
 
.container1 > div, .container2 > div, .container3 > div {
  width: 15px;
  height: 15px;
  background-color: $brand;
 
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
 
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>

