<template>
  <div class="toolbar-tlist" 
    @mouseover="listSwite=true"
    @mouseout="listSwite=false"
    >
    <span class="name">{{area}}<i class="iconfont icon-arrow-right"></i></span>
    <div class="list-wrap-scroll" :class="{active: listSwite}">
      <ul class="toolbar-list-wrap">
        <li class="list" 
          @click="clear()">
          <span>全部区域</span>
        </li>
        <li class="list" 
          @click="toStreet(item)"
          v-if="countryArr.length >= 1 && item['longitudeGD']"
          v-for="(item, index) in countryArr"
          :key="index">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import VIscroll from 'viscroll'
  export default {
    components: { VIscroll },
    props: [
    ],
    data () {
      return {
        listSwite: false,
        listName: '区域筛选'
      }
    },
    computed: {
      ...mapGetters([
        'countryArr',
        'MtypeId',
        'area'
      ])
    },
    watch: {
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
        'AgetLoginSwite',
        'AgetDLname',
        'AgetMstCode',
        'AgetStreetA',
        'Aclear'
      ]),
      toStreet (arr) {
        this.listSwite = false
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
        this.listName = name
      },
      clear () {
        this.AgetDLname('')
        this.AgetMstCode('')
        this.AgetStreetA([])
        let len = this.countryArr.length
        let number = 0
        for (let i = 0; i < len; i++) {
          number += this.countryArr[i].count
        }
        this.AgetMMnumber(number)
        this.Aclear()
        this.AgetZoneSwite(true)
        this.AgetStrSwite(false)
        this.AgetDetSwite(false)
        this.listName = '区域筛选'
        this.AgetCenter([121.5273285, 31.21515044])
        this.AgetMposition([121.5273285, 31.21515044])
        this.Agetzoom(12)
        this.AgetMzoom(12)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .toolbar-tlist {
    position: relative;
    height: auto;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px; 
    font-size: 14px;
    color: #fff;
    line-height: 48px;
    border-left: 1px solid hsla(0,0%,100%,.3);
    cursor: pointer;
    i {
      margin-left: 10px;
      display: inline-block;
      transform: rotate(90deg);
      font-size: 13px;
      color: #fff;
    }
    &:hover .name {
      color: #fdc00f;
      i {
        color: #fdc00f;
      }
    }
  }
  .list-wrap-scroll {
    position: absolute;
    left: 0;
    top: 48px;
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden; 
    display: none;
    &.active {
      display: block;
    }
  }
  .toolbar-list-wrap {
    position: relative;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: rgba(74, 74, 74, 0.86);
    .list {
      position: relative;
      width: 100%;
      height: 30px;
      padding-right: 5px;
      padding-left: 5px;
      text-align: center;
      line-height: 30px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap
    }
    .list:hover {
      color: #fdc00f;
    }
  }
</style>
