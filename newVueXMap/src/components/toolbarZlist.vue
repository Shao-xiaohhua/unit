<template>
  <div class="toolbar-tlist" 
    @mouseover="listSwite=true"
    @mouseout="listSwite=false"
    :style="{width: wid}"
    >
    <span class="name">{{listName}}<i class="iconfont icon-arrow-right"></i></span>
    <div class="list-wrap-scroll" :class="{active: listSwite}">
      <ul class="toolbar-list-wrap" :class="{active: listSwite}">
        <li class="list" 
          @click="clear()">
          <span>全部类型</span>
        </li>
        <li class="list" 
          @click="toType(item)"
          v-for="(item, index) in typename"
          :key="index">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>  
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {},
    props: [
    ],
    data () {
      return {
        listSwite: false,
        listName: '机构类型',
        wid: '150px'
      }
    },
    computed: {
      ...mapGetters([
        'typename',
        'MzoneCode',
        'MstCode',
        'MtypeId',
        'Mzoom',
        'streetArr',
        'jgName'
      ])
    },
    watch: {
      jgName (newVal) {
        this.listName = newVal
      }
    },
    methods: {
      ...mapActions([
        'AgetMtypeId',
        'AgetLoginSwite',
        'AgetStreet',
        'AgetMstCode',
        'AgetStreetA',
        'Agetzoom',
        'AgetMzoom',
        'AgetcountryA',
        'AgetMMnumber',
        'AgetRoll',
        'Acountyr',
        'AgetDetailListS',
        'AgetNameToType',
        'AgetjgName'
      ]),
      toType (item) {
        let id = item.id
        let name = item.name
        this.AgetMtypeId(id)
        this.AgetjgName(name)
        this.AgetNameToType(name)
        // this.AgetMstCode('')
        // this.AgetStreetA([])
        this.AgetRoll(false)
        let arrC = {
          typeId: this.MtypeId
        }
        let arrS = {
          zoneCode: this.MzoneCode,
          pageSize: -1,
          typeId: this.MtypeId
        }
        let arrD = {
          zoneCode: this.MzoneCode,
          typeId: this.MtypeId,
          towncode: this.MstCode,
          pageSize: 20,
          page: 1
        }
        this.AgetLoginSwite(true)
        this.Acountyr(arrC)
        this.AgetStreet(arrS)
        this.AgetDetailListS(arrD)
        if (this.Mzoom > 12 && this.Mzoom < 15) {
        } else if (this.Mzoom >= 15) {
        } else {
        }
      },
      clear () {
        this.AgetMtypeId('1309ace1040f457cb27f48d3b66e13cf')
        this.AgetNameToType('')
        this.AgetRoll(false)
        let arrC = {
          typeId: this.MtypeId
        }
        let arrS = {
          zoneCode: this.MzoneCode,
          pageSize: -1,
          typeId: this.MtypeId
        }
        let arrD = {
          zoneCode: this.MzoneCode,
          typeId: this.MtypeId,
          towncode: this.MstCode,
          pageSize: 20,
          page: 1
        }
        this.AgetLoginSwite(true)
        this.Acountyr(arrC)
        this.AgetStreet(arrS)
        this.AgetDetailListS(arrD)
        if (this.Mzoom > 12 && this.Mzoom < 15) {
        } else if (this.Mzoom >= 15) {
        } else {
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
</style>
