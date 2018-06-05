<template>
  <div class="list-detail" v-iscroll>
    <div class="org-list">
      <ul>
        <li v-for="(item,index) in detailList" @click="dtClick(item)" :key="index">
          <a href="javascript:;" class="org-item">
            <div class="thumb-wrap">
              <div class="thumb" style="background-image:url('static/images/default_org.jpg');"></div>
              <div class="org-type blue" v-if="item.typeName === '律师事务所'">律所</div>
              <div class="org-type orange" v-if="item.typeName === '法律服务所'">服务所</div>
              <div class="org-type green" v-if="item.typeName === '人民调解委员会'">人民调解</div>
              <div class="org-type red" v-if="item.typeName === '司法鉴定所'">司法鉴定</div>
              <div class="org-type teal" v-if="item.typeName === '法援机构'">法律援助</div>
              <div class="org-type teal" v-if="item.typeName === '法援'">法律援助</div>
              <div class="org-type cyan" v-if="item.typeName === '公证处'">公证处</div>
              <div class="org-type pink" v-if="item.typeName === '司法局'">社区工作</div>
            </div>
            <h4 class="org-name" v-text="item.properties.name"></h4>
            <div class="org-info"><i class="iconfont icon-tel"></i><span>{{item.properties.phone}}</span></div>
            <div class="org-info">
              <i class="iconfont icon-local"></i>
              <span v-if="item.properties.address">{{item.properties.address}}</span>
              <span v-else>{{item.properties.domicileAddress}}</span>
            </div>
            <div class="org-distance">{{item.count}}</div>
          </a>
        </li>
        <div v-if="MMDnumber>=20 && MstCode" class="res-inn but-up" v-on:click="ajaxdown()">上一页</div>
        <div v-if="MMDnumber>=20 && MstCode  && !(pageNumber/pGnum===1)" class="res-inn but-dowm" v-on:click="ajaxup()">下一页</div>
        <div v-if="MMDnumber>=20 && MstCode  && (pageNumber/pGnum===1)" class="res-inn but-dowm">下一页</div>
        <div v-if="MMDnumber>=20 && MstCode" class="res-num-ber">{{pageNumber}}/{{pGnum}}</div>
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
        pGnum: 0,
        numberPage: 1
      }
    },
    computed: {
      ...mapGetters([
        'detailList',
        'MstCode',
        'pageNumber',
        'DLname',
        'MzoneCode',
        'MtypeId',
        'MMDnumber'
      ])
    },
    watch: {
      DLname () {
        this.numberPage = 1
        this.AgetPageNumber(this.numberPage)
      },
      MstCode () {
        this.numberPage = 1
        this.AgetPageNumber(this.numberPage)
      },
      MMDnumber () {
        this.pGnum = Math.ceil(this.MMDnumber / 20)
      },
      pageNumber () {
        if (this.MstCode) {
          this.AgetLoginSwite(true)
          let arr = {
            zoneCode: this.MzoneCode,
            typeId: this.MtypeId,
            towncode: this.MstCode,
            pageSize: 20,
            page: this.pageNumber
          }
          this.AgetDetailList(arr)
        }
      },
      detailList () {
        // setTimeout(() => {
        //   this.AgetRoll(true)
        // }, 2000)
      }
    },
    methods: {
      ...mapActions([
        'AgetDetailArr',
        'AgetRoll',
        'AgetPageNumber',
        'AgetDetailList',
        'AgetLoginSwite'
      ]),
      hoverCityOver () {
      },
      hoverCityOut () {
      },
      dtClick (item) {
        this.AgetRoll(false)
        this.AgetDetailArr(item)
      },
      ajaxdown () {
        this.AgetRoll(false)
        if (this.numberPage === 1) {
          this.numberPage = 1
        } else {
          this.numberPage--
        }
        this.AgetPageNumber(this.numberPage)
      },
      ajaxup () {
        this.AgetRoll(false)
        if (this.numberPage >= this.pGnum) {
          this.numberPage = this.pGnum
        } else {
          this.numberPage++
        }
        this.AgetPageNumber(this.numberPage)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .list-detail {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  // 机构列表
  .org-list {
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
    background: $white;
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      list-style: none;
      li {
        border-top: 1px solid $gray-lighter;
        &:first-child {
          border-top: none;
        }
      }
    }
    .org-item {
      position: relative;
      display: block;
      padding: $module-padding 10px;
      @include clearfix();
      .thumb-wrap {
        overflow: hidden;
        float: left;
        width: 56px;
      }
      .thumb {
        overflow: hidden;
        margin-top: 2px;
        width: 56px;
        height: 50px;
        border: 1px solid $gray-lighter;
        border-bottom: none;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 1s;
      }
      .org-distance {
        position: absolute;
        right: 20px;
        bottom: 17px;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        background: $white;
      }
      .org-type {
        z-index: 10;
        position: relative;
        width: 100%;
        text-align: center;
        font-size: $font-size-small;
        font-family: $font-family-more;
        @include text-overflow();
        color: $white;
        background-color: $gray-light;
        &.blue {
          background-color: $brand-blue;
        }
        &.red {
          background-color: $brand-red;
        }
        &.green {
          background-color: $brand-green;
        }
        &.orange {
          background-color: darken($brand-orange, 5%);
        }
        &.cyan {
          background-color: $brand-cyan;
        }
        &.teal {
          background-color: $brand-teal;
        }
        &.pink {
          background-color: $brand-pink;
        }
      }
      .org-name {
        padding-bottom: 4px;
        margin: 0 0 0 65px;
        font-size: 15px;
        color: $gray-dark;
        @include text-overflow();
      }
      .org-info {
        margin: 0 0 0 65px;
        padding-top: 2px;
        padding-right: 50px;
        color: $gray-light;
        @include text-overflow();
      }
      .iconfont {
        vertical-align: middle;
        padding-right: 5px;
        font-size: $font-size-base;
        color: #bbb;
      }
      &:hover {
        background-color: #fafafa;
        .thumb {
          transform: scale(1.1);
        }
        .org-name {
          color: $brand;
        }
        .org-distance {
          background-color: #fafafa;
        }
      }
    }
  }
.res-inn {
  width: 50%;
  height: 30px;
  background: $white;
  float: left;
  text-align: center;
  line-height: 30px;
  color: $gray-dark;
  cursor: pointer;
}
.res-num-ber {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
</style>

