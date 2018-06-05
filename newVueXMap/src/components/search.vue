<template>
  <div class="search-box">
    <!-- v-focus为自定义指令 详见main.js -->
    <input 
      type="text" 
      v-model="serarch" 
      class="search-input" 
      placeholder="输入机构名称精确查找"
      @focus="inputFocus"
      @blur="inputBlur"
      @keyup="inputKeyup"
      @click="inputFocus"
      ref="input"
    >
    <div class="search-icon" v-if="!serarch">
      <i class="iconfont icon-search"></i>
    </div>
    <div class="search-icon" v-if="serarch" @click="clear">
      <i class="iconfont icon-clean"></i>
    </div>
    <div class="search-list-box" v-if="listArr">
      <ul class="search-list-wrap" v-if="searArr.length >= 1">
        <div class="title">
          <span class="name">机构搜索结果</span>
        </div>
        <li class="list clearfix"
          v-for="(item, index) in searArr"
          v-if="item.properties.latitudeGD"
          :class="{active: item.active}"
          @click="forJg(item)"
          :key="index"
        >
          <div class="iconfont-box">
            <div class="radio-box" v-if="item.typeName !== '律师事务所' && item.typeName !== '人民调解委员会' && item.typeName !== '法援机构' && item.typeName !== '公证处' && item.typeName !== '司法鉴定所'"></div>
            <div class="radio-box tj" v-if="item.typeName === '人民调解委员会'"></div>
            <div class="radio-box ls" v-if="item.typeName === '律师事务所'"></div>
            <div class="radio-box fy" v-if="item.typeName === '法援机构'"></div>
            <div class="radio-box gz" v-if="item.typeName === '公证处'"></div>
            <div class="radio-box jd" v-if="item.typeName === '司法鉴定所'"></div>
          </div>
          <div class="content-box">
            <span>{{item.properties.name}}</span>
          </div>
        </li>
      </ul>
      <ul class="search-list-wrap" v-if="DLarr.length >= 1">
        <div class="title">
          <span class="name">地理范围搜索结果</span>
          <span v-if="serarch">-</span>
          <span>{{serarch}}</span>
        </div>
        <li class="list clearfix"
          v-for="(item, index) in DLarr"
          v-if="item.location"
          :class="{active: item.active}"
          @click="forDL(item)"
          :key="index"
        >
          <div class="iconfont-box">
            <i class="iconfont icon-local"></i>
          </div>
          <div class="content-box">
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="search-list-box" v-if="HlistArr">
      <ul class="search-list-wrap" v-if="LSarr.length >= 1">
        <div class="title">
          <span class="name">历史纪录</span>
        </div>
        <li class="list clearfix"
          v-for="(item, index) in LSarr"
          v-if="item.id"
          :class="{active: item.active}"
          :key="index"
        >
          <div class="iconfont-box">
            <i class="iconfont icon-history"></i>
          </div>
          <div class="content-box">
            <span @click="forJg(item)">{{item.properties.name}}</span>
          </div>
          <div class="remove-box" @click="removeLocas(index)">
            <i class="iconfont icon-clear"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    import api from '../api/index'
    export default {
      components: { api },
      props: [
      ],
      data () {
        return {
          serarch: '',
          focusIndex: -1,
          listArr: false,
          HlistArr: false,
          kSwite: true,
          searchSwite: true
        }
      },
      computed: {
        ...mapGetters([
          'DLarr',
          'searArr',
          'LSarr',
          'MtypeId'
        ])
      },
      watch: {
        serarch () {
          if (this.serarch) {
            let regex = /\s/g
            let textR = this.serarch.replace(regex, '')
            this.AgetSearchText(textR)
          } else {
            this.AgetDLarr([])
            this.AgetSearArr([])
          }
        },
        DLarr () {
        },
        focusIndex () {
          if (this.DLarr.length >= 1 && !this.searArr.length) {
            let arr = this.DLarr
            let len = arr.length
            if (this.focusIndex < 0) {
              this.focusIndex = len - 1
            }
            if (this.focusIndex >= len) {
              this.focusIndex = 0
            }
            for (let i = 0; i < len; i++) {
              arr[i].active = false
            }
            arr[this.focusIndex].active = true
            this.AgetDLarr(arr)
          } else if (this.searArr.length >= 1 && !this.DLarr.length) {
            let arr = this.searArr
            let len = arr.length
            if (this.focusIndex < 0) {
              this.focusIndex = len - 1
            }
            if (this.focusIndex >= len) {
              this.focusIndex = 0
            }
            for (let i = 0; i < len; i++) {
              arr[i].active = false
            }
            arr[this.focusIndex].active = true
            this.AgetSearArr(arr)
          } else if (this.searArr.length >= 1 && this.DLarr.length >= 1) {
            let dLen = parseInt(this.DLarr.length)
            let sLen = parseInt(this.searArr.length)
            if (this.kSwite) {
              this.clearActiveDL()
              let arr = this.searArr
              let len = arr.length
              if (this.focusIndex < 0) {
                this.kSwite = false
                this.focusIndex = (dLen - 1)
                return
              }
              if (this.focusIndex >= sLen) {
                this.kSwite = false
                this.focusIndex = 0
                return
              }
              for (let i = 0; i < len; i++) {
                arr[i].active = false
              }
              arr[this.focusIndex].active = true
              this.AgetSearArr(arr)
            } else {
              this.clearActiveSearch()
              let arr = this.DLarr
              let len = arr.length
              if (this.focusIndex < 0) {
                this.kSwite = true
                this.focusIndex = sLen - 1
                return
              }
              if (this.focusIndex >= dLen) {
                this.kSwite = true
                this.focusIndex = 0
                return
              }
              for (let i = 0; i < len; i++) {
                arr[i].active = false
              }
              arr[this.focusIndex].active = true
              this.AgetDLarr(arr)
            }
          }
        }
      },
      methods: {
        ...mapActions([
          'AgetSearchText',
          'AgetDLarr',
          'AgetSearArr',
          'AgetLSarr',
          'AgetdlposObject',
          'AgetseposObject',
          'AgetCenter',
          'AgetMposition',
          'Agetzoom',
          'AgetMzoom',
          'AgetLSarr'
        ]),
        forJg (item) {
          if (item) {
            this.AgetseposObject(item)
            this.clearActiveDL()
            this.clearActiveSearch()
          }
          if (localStorage.newLSarr) {
            let arr
            arr = JSON.parse(localStorage.newLSarr)
            arr.push(item)
            localStorage.newLSarr = JSON.stringify(arr)
          } else {
            let arr = []
            arr.push(item)
            localStorage.newLSarr = JSON.stringify(arr)
          }
        },
        forDL (item) {
          if (item) {
            this.AgetdlposObject(item)
            this.clearActiveDL()
            this.clearActiveSearch()
          }
        },
        clearActiveDL () {
          if (this.DLarr.length >= 1) {
            let len = this.DLarr.length
            let arr = this.DLarr
            for (let i = 0; i < len; i++) {
              arr[i].active = false
            }
            this.AgetDLarr(arr)
          }
        },
        clearActiveSearch () {
          if (this.searArr.length >= 1) {
            let len = this.searArr.length
            let arr = this.searArr
            for (let i = 0; i < len; i++) {
              arr[i].active = false
            }
            this.AgetSearArr(arr)
            return
          }
        },
        inputFocus () {
          if (this.serarch === '') {
            this.AgetDLarr([])
            this.AgetSearArr([])
            this.HlistArr = true
          } else {
            this.focusIndex = -1
            this.kSwite = true
            this.listArr = true
            this.HlistArr = false
          }
          this.clearActiveDL()
          this.clearActiveSearch()
          if (localStorage.newLSarr) {
            let arr = JSON.parse(localStorage.newLSarr)
            let len = arr.length
            let swite = true
            let newArr = []
            for (let i = 0; i < len; i++) {
              swite = true
              for (let j = i + 1; j < len; j++) {
                if (arr[i].properties.name === arr[j].properties.name) {
                  console.log(arr[i].properties.name)
                  swite = false
                  break
                }
              }
              if (swite) {
                newArr.push(arr[i])
              }
            }
            localStorage.newLSarr = JSON.stringify(newArr)
            this.AgetLSarr(newArr)
          }
        },
        inputBlur () {
          this.focusIndex = -1
          this.kSwite = true
          this.clearActiveDL()
          this.clearActiveSearch()
          setTimeout(() => {
            this.listArr = false
            this.HlistArr = false
          }, 500)
        },
        inputKeyup (e) {
          this.listArr = true
          this.HlistArr = false
          let kcd = e.keyCode
          if (kcd === 8) {
            if (!this.serarch) {
              setTimeout(() => {
                this.AgetDLarr([])
                this.AgetSearArr([])
              }, 500)
            }
          } else if (kcd === 27) {
            this.serarch = ''
          } else if (kcd === 38) {
            this.focusIndex--
          } else if (kcd === 40) {
            this.focusIndex++
          } else if (kcd === 13) {
            let item = this.$refs.input
            if (this.kSwite) {
              let len = this.searArr.length
              for (let i = 0; i < len; i++) {
                if (this.searArr[i].active === true) {
                  this.AgetseposObject(this.searArr[i])
                  break
                }
              }
              item.blur()
              return
            } else {
              let len = this.DLarr.length
              for (let i = 0; i < len; i++) {
                if (this.DLarr[i].active === true) {
                  this.AgetdlposObject(this.DLarr[i])
                  break
                }
              }
              item.blur()
              return
            }
          }
        },
        getSearchDetail (item) {
          console.log(item)
        },
        getDlDetail (item) {
          console.log(item)
        },
        clear () {
          this.serarch = ''
          this.AgetDLarr([])
          this.AgetSearArr([])
          this.AgetseposObject({})
          this.AgetdlposObject({})
          this.AgetCenter([121.5273285, 31.21515044])
          this.AgetMposition([121.5273285, 31.21515044])
          this.Agetzoom(12)
          this.AgetMzoom(12)
        },
        removeLocas (index) {
          if (localStorage.newLSarr) {
            let arr = JSON.parse(localStorage.newLSarr)
            arr.splice(index, 1)
            localStorage.newLSarr = JSON.stringify(arr)
            this.AgetLSarr(arr)
          }
        }
      },
      created () {
        if (localStorage.newLSarr) {
          let arr = JSON.parse(localStorage.newLSarr)
          this.AgetLSarr(arr)
        }
      }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .search-box {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 7px 15px 0;
    .search-input {
      padding: 0 34px 0 10px;
      height: 34px;
      border: none;
      border-radius: 4px;
      outline: none;
      width: 280px;
      font-size: 15px;
      color: #333;
    }
    .search-icon {
      z-index: 10;
      position: absolute;
      top: 15px;
      right: 15px;
      width: 34px;
      height: 34px;
      text-align: center;
      color: #bbb;
      cursor: pointer;
    }
    .search-list-box {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 38px;
      width: 280px;
      height: auto;
      background: #fff;
    }
    .search-list-wrap {
      width: 100%;
      height: auto;
      margin: 0;
      padding: 0;
      list-style: none;
      .list {
        position: relative;
        width: 100%;
        height: auto;
        cursor: pointer;
        border-bottom: 1px solid $gray-lighter;
      }
      .list:last-child {
        border-bottom: none;
      }
      .list:hover, .list.active {
        background: $brand;
        .iconfont-box, .content-box {
          color: #fff;
        }
        .remove-box {
          i {
            color: $white;
          }
        }
      }
      .iconfont-box {
        position: relative;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        float: left;
        color: #999;
      }
      .radio-box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid #999;
        z-index: 88;
      }
      .radio-box.tj {
        border-color: #090;
      }
      .radio-box.ls {
        border-color: #348ac7;
      }
      .radio-box.gz {
        border-color: #1ab99b;
      }
      .radio-box.fy {
        border-color: #0fa3b1;
      }
      .radio-box.jd {
        border-color: #ec4040;
      }
      .content-box {
        width: calc(100% - 40px);
        min-height: 40px;
        padding-top: 8px;
        padding-right: 20px;
        padding-bottom: 8px;
        font-size: 15px;
        color: #999;
        float: left;
        word-wrap:break-word
      }
      .title {
        position: relative;
        width: 100%;
        height: 40px;
        padding: 0 15px;
        line-height: 40px;
        color: #333;
        font-weight: bold;
        font-size: 16px;
        border-bottom: 1px solid $gray-lighter;
      }
    }
    .remove-box {
      position: absolute;
      right: 5px;
      top: 10px;
      i {
        font-size: 16px;
        color: #999;
      }
    }
  }
</style>
