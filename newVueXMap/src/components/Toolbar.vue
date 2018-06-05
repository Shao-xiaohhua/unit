<template>
  <div class="toolbar clearfix">
    <!-- 搜索栏 -->
   <div class="search-wrap pull-left">
     <search></search> 
   </div>
   <!-- 区域栏 -->
   <div class="z-wrap pull-left" v-if="countryArr.length >= 1">
     <toolbar-tlist></toolbar-tlist>
   </div>
   <!-- 街道栏 -->
   <div class="z-wrap pull-left" v-if="this.Mzoom > 12">
     <toolbar-slist></toolbar-slist>
   </div>
   <!-- 类型栏 -->
   <div class="z-wrap pull-left">
     <toolbar-zlist></toolbar-zlist>
   </div>
   <!-- 清空 -->
   <div class="z-wrap pull-left" @click="tbClick">
     <span class="toolbar-clear">清空<i class="iconfont icon-clear"></i></span>
   </div>
  </div>
</template>
<script>
  import search from '@/components/search'
  import toolbarSlist from '@/components/toolbarSlist'
  import toolbarTlist from '@/components/toolbarTlist'
  import toolbarZlist from '@/components/toolbarZlist'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: { search, toolbarSlist, toolbarTlist, toolbarZlist },
    props: [
    ],
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'countryArr',
        'Mzoom'
      ])
    },
    directive: {
      ccc: {
        inserted: function (el) {
          console.log(el)
        }
      }
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
        'Aclear',
        'AgetMtypeId',
        'AgetNameToType',
        'Acountyr',
        'AgetDetailListS',
        'AgetjgName'
      ]),
      tbClick () {
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

        this.AgetMtypeId('1309ace1040f457cb27f48d3b66e13cf')
        this.listName = '机构类型'
        this.AgetNameToType('')
        this.AgetRoll(false)
        let arrC = {
          typeId: this.MtypeId
        }
        // let arrS = {
        //   zoneCode: this.MzoneCode,
        //   pageSize: -1,
        //   typeId: this.MtypeId
        // }
        let arrD = {
          zoneCode: this.MzoneCode,
          typeId: this.MtypeId,
          towncode: this.MstCode,
          pageSize: 20,
          page: 1
        }
        this.AgetLoginSwite(true)
        this.Acountyr(arrC)
        this.AgetDetailListS(arrD)
        this.AgetjgName('机构名称')
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
  .toolbar{
    z-index: 900;
    position: absolute;
    width: 100%;
    height: 48px;
    background-color: rgba(#4a4a4a, .86);
  }
  .search-wrap {
    position: relative;
    width: 310px;
    height: 100%;
  }
  .z-wrap {
    position: relative;
    width: auto;
    height: 100%;
  }
  .toolbar-clear {
    height: 48px;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 48px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    i {
      margin-left: 10px;
    }
  }
</style>
