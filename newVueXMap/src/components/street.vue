<template>
  <div class="street">
    <div class="country" v-iscroll>
      <ul class="country-list-wrap">
        <li class="list" v-for="(item, index) in streetArr"
          @click="toDetail(item)"  
        >
          <a href="javascript:;">
            <span class="name">{{item.name}}</span>
            <span class="number">{{item.count}}所</span>
          </a>
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
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'streetArr',
        'MzoneCode',
        'MtypeId'
      ])
    },
    watch: {
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
        'AgetDLname',
        'AgetMMDnumber'
      ]),
      hoverCityOver () {
      },
      hoverCityOut () {
      },
      toDetail (item) {
        this.AgetLoginSwite(true)
        this.AgetRoll(false)
        this.AgetZoneSwite(false)
        this.AgetStrSwite(false)
        this.AgetDetSwite(true)
        let code = item.code
        let number = item.count
        let name = item.name
        this.AgetDLname(name)
        this.AgetMMDnumber(number)
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
        this.AgetDetailList(arr)
        this.AgetCenter(pos)
        // this.AgetMposition(pos)
        this.Agetzoom(15)
        this.AgetMzoom(15)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .street {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

