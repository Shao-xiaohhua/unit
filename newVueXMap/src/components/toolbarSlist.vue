<template>
  <div class="toolbar-tlist" 
    @mouseover="listSwite=true"
    @mouseout="listSwite=false"
    :style="{width: wid}"
    >
    <span class="name" v-if="DLname">{{DLname}}<i class="iconfont icon-arrow-right"></i></span>
    <span class="name" v-if="!DLname">街道筛选<i class="iconfont icon-arrow-right"></i></span>
    <div class="list-wrap-scroll" :class="{active: listSwite}">
      <ul class="toolbar-list-wrap" :class="{active: listSwite}">
        <li class="list" 
          @click="clear()">
          <span>全部街道</span>
        </li>
        <li class="list" 
          @click="toDetail(item)"
          v-for="(item, index) in streetArr"
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
        listName: '街道筛选',
        wid: '150px'
      }
    },
    computed: {
      ...mapGetters([
        'streetArr',
        'MzoneCode',
        'MtypeId',
        'Mzoom',
        'DLname'
      ])
    },
    watch: {
      Mzoom (newVal) {
        if (this.Mzoom < 15) {
          this.listName = '街道筛选'
        }
      }
    },
    methods: {
      ...mapActions([
        'AgetRoll',
        'AgetZoneSwite',
        'AgetStrSwite',
        'AgetDetSwite',
        'AgetMstCode',
        'AgetCenter',
        'Agetzoom',
        'AgetMzoom',
        'AgetDetailList',
        'AgetMMnumber',
        'AgetLoginSwite',
        'AgetDLname'
      ]),
      toDetail (item) {
        this.listSwite = false
        this.AgetLoginSwite(true)
        this.AgetRoll(false)
        this.AgetZoneSwite(false)
        this.AgetStrSwite(false)
        this.AgetDetSwite(true)
        let code = item.code
        let number = item.count
        let name = item.name
        this.AgetDLname(name)
        this.AgetMMnumber(number)
        let lat = item.latitudeGD
        let log = item.longitudeGD
        let pos = [log, lat]
        this.AgetMstCode(code)
        let arr = {
          zoneCode: this.MzoneCode,
          typeId: this.MtypeId,
          towncode: code,
          pageSize: 20,
          page: 1
        }
        this.listName = name
        this.AgetDetailList(arr)
        this.AgetCenter(pos)
        // this.AgetMposition(pos)
        this.Agetzoom(15)
        this.AgetMzoom(15)
      },
      clear () {
        this.listName = '街道筛选'
        this.Agetzoom(13)
        this.AgetMzoom(13)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
</style>
