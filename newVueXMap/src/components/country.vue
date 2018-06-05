<template>
  <div class="country" v-iscroll>
    <ul class="country-list-wrap">
      <li class="list" v-for="(item, index) in countryArr"
        @click="toStreet(item)"
        v-if="countryArr.length >= 1 && item['longitudeGD']"
        :key="index"
      >
        <a href="javascript:;">
          <span class="name">{{item.name}}</span>
          <span class="number">{{item.count}}所</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {},
    data () {
      return {
        arrList: []
      }
    },
    computed: {
      ...mapGetters([
        'countryArr',
        'MtypeId'
      ])
    },
    watch: {
      countryArr () {
        this.arrList = this.countryArr
      }
    },
    methods: {
      ...mapActions([
        'AroutFun',
        'AstreetHref',
        'AgetZoneSwite',
        'AgetStrSwite',
        'AgetDetSwite',
        'AgetRoll',
        'AgetMMnumber',
        'AgetArea',
        'AgetMzoneCode',
        'AgetCenter',
        'AgetMposition',
        'Agetzoom',
        'AgetMzoom',
        'AgetLoginSwite'
      ]),
      hoverCityOver () {
      },
      hoverCityOut () {
      },
      toStreet (arr) {
        this.AgetLoginSwite(true)
        this.AgetRoll(false)
        this.AgetZoneSwite(false)
        this.AgetStrSwite(true)
        this.AgetDetSwite(false)
        let lat = arr.latitudeGD
        let log = arr.longitudeGD
        let pos = [log, lat]
        let name = arr.name
        let code = arr.code
        let number = arr.count
        this.AgetArea(name)
        this.AgetMMnumber(number)
        this.AgetMzoneCode(code)
        this.AgetCenter(pos)
        this.AgetMposition(pos)
        this.Agetzoom(14)
        this.AgetMzoom(14)
      }
    },
    created () {
      this.arrList = this.countryArr
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .country {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .country-list-wrap {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    list-style: none;
    .list {
      width: 100%;
      height: auto;
      border-bottom: 1px solid $gray-lighter;
      cursor: pointer;
      a {
        position: relative;
        display: block;
        width: 100%;
        height: auto;
        padding-left: 15px;
        padding-right: 35px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 15px;
        color: $gray-light;
        @include clearfix;
        .number {
          float: right;
        }
        &:hover {
          color: #ff4240;
          background-color: #fafafa;
        }
        &:after {
          clear: both;
          content: "\E645";
          position: absolute;
          right: 5px;
          top: 10px;
          display: inline-block;
          font-family: iconfont!important;
          font-size: 14px;
          color: #bbb;
        }
      }
    }
    .list:last-child {
      border-bottom: none;
    }
  }

</style>

