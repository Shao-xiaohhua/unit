<template>
  <div class="inner-toolbar">
    <h3>{{area}}<span v-if="DLname">（{{DLname}}）</span></h3>
    <p>找到
    <span class="number" v-if="Mzoom <= 12">{{MMnumber}}</span>
    <span class="number" v-if="Mzoom > 12 && Mzoom < 15">{{MMSnumber}}</span>
    <span class="number" v-if="Mzoom >= 15">{{MMDnumber}}</span>所<span v-if="!nameToType">法律机构</span>{{nameToType}}</p>
    <div class="button-back" @click="goBack()" v-if="Mzoom > 12">
      <i class="iconfont icon-back"></i>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {},
    data () {
      return {
        title: '',
        number: ''
      }
    },
    computed: {
      ...mapGetters([
        'area',
        'MMnumber',
        'DLname',
        'Mzoom',
        'MMSnumber',
        'MMDnumber',
        'countryArr',
        'nameToType'
      ])
    },
    methods: {
      ...mapActions([
        'AroutFun',
        'AgetMzoom',
        'Agetzoom',
        'AgetMMnumber'
      ]),
      hoverCityOver () {
      },
      hoverCityOut () {
      },
      goBack () {
        if (this.Mzoom > 12 && this.Mzoom < 15) {
          this.AgetMzoom(12)
          this.Agetzoom(12)
          let len = this.countryArr.length
          let num = 0
          for (let i = 0; i < len; i++) {
            num += this.countryArr[i].count
          }
          this.AgetMMnumber(num)
        } else if (this.Mzoom >= 15) {
          this.AgetMzoom(14)
          this.Agetzoom(14)
        } else {
        }
      }
    },
    created () {
    },
    watch: {
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .inner-toolbar {
    position: relative;
    right: 0;
    top: 0;
    width: 100%;
    height: 80px;
    padding: 15px;
    background-color: #f6f6f6;
    border-bottom: 1px solid #eaeaea;
    h3 {
      position: relative;
      width: 100%;
      display: block;
      margin: 0;
      font-size: 18px;
      color: #333;
      span {
        padding-left: 20px;
        font-size: 14px;
        color: $gray-light;
      }
    }
    p {
      margin: 0;
      padding-top: 5px;
      font-size: 15px;
      color: gray;
      .number {
        padding: 0 5px;
        font-weight: 700;
        color: $brand;
      }
    }
    .button-back {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 20px;
      margin: auto;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 50%;
      cursor: pointer;
      .iconfont {
        color: #aaa;
        font-size: 36px;
      }
    }
    .button-back:hover {
      .iconfont {
        color: $brand;
      }
    }
  }
</style>

