<template>
  <div class="amap-container">
    <el-amap
      :vid="'amap-vue'"
      :center="center"
      ref="lawmap"
      :zooms="[11, 18]"
      :zoom="zoom"
      :map-manager="amapManager"
      :amap-manager="amapManager"
      :animateEnable="false"
      :events="mapEvents">
      <!-- 区域mark点 -->
        <el-amap-marker
          v-for="(marker, index) in countryArr"
          v-if="countryArr.length >= 1 && marker['longitudeGD'] && ZoneSwite"
          :key="marker.id"
          :content="'<div class=\'zoneM\' data-lat=\''+marker['latitudeGD']+'\' data-log=\''+marker['longitudeGD']+'\' data-code=\''+marker.code+'\'>'+marker.name+'<br>'+marker.count+'</div>'"
          :position="[marker['longitudeGD'], marker['latitudeGD']]"
          :events="cityEvents">
        </el-amap-marker>
        <!-- 街道mark点 -->
        <el-amap-marker
          v-for="(marker, index) in streetArr"
          v-if="streetArr.length >= 1 && StrSwite && marker['latitudeGD'] && marker"
          :key="marker.id"
          :content="'<div class=\'strM\' data-towncode=\''+marker.twoncode+'\' data-lat=\''+marker['latitudeGD']+'\' data-log=\''+marker['longitudeGD']+'\' data-code=\''+marker.code+'\' data-num=\''+marker.count+'\' data-name=\''+marker.name+'\'>'+marker.name+'<br>'+marker.count+'</div>'"
          :position="[marker['longitudeGD'], marker['latitudeGD']]"
          :events="strEvent">
          </el-amap-marker>
          <!-- 详细机构mark点 -->
          <el-amap-marker
          v-for="(marker, index) in detailList"
          v-if="detailList.length >= 1 && marker.properties.longitudeGD && DetSwite"
          :key="marker.id"
          :content="'<div class=\'dtrM '+marker.typeName+'\' data-name=\''+marker.properties.name+'\' data-typename=\''+marker.typeName+'\' data-id=\''+marker.id+'\' data-phone=\''+marker.properties.phone+'\' data-addres=\''+marker.properties.address+'\' data-log=\''+marker.properties.longitudeGD+'\' data-lat=\''+marker.properties.latitudeGD+'\'><i class=\'iconfont icon-local\'></i></div>'"
          :position="[marker.properties.longitudeGD, marker.properties.latitudeGD]"
          :events="detEvent">
          </el-amap-marker>
          <!-- 定位坐标点 -->
          <el-amap-marker
          v-for="(marker, index) in posarrPos"
          v-if="posarrPos.length >= 1 && DetSwite"
          :key="marker.id"
          :content="'<div class=\'dwM\'></div>'"
          :position="[marker.location.lng, marker.location.lat]">
          </el-amap-marker>
          <!-- 我的位置定位点 -->
          <el-amap-marker
          v-if="goPos.length >= 1 && DetSwite"
          :content="'<div class=\'dwMP\'></div>'"
          :position="goPos">
          </el-amap-marker>
        <!-- 弹窗 -->
      <el-amap-info-window
        :position="window.position"
        :content="window.content"
        :visible="window.visible"
        :events="window.events"
        :offset="[-10, -20]">
      </el-amap-info-window>
      <!-- 线 -->
      <el-amap-polyline :editable="lineSwite" :visible="lineAAR[0].swite"  :path="lineAAR[0].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[1].swite" :editable="lineSwite"  :path="lineAAR[1].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[2].swite" :editable="lineSwite"  :path="lineAAR[2].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[3].swite" :editable="lineSwite"  :path="lineAAR[3].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[4].swite" :editable="lineSwite"  :path="lineAAR[4].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[5].swite" :editable="lineSwite"  :path="lineAAR[5].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[6].swite" :editable="lineSwite"  :path="lineAAR[6].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[7].swite" :editable="lineSwite"  :path="lineAAR[7].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[8].swite" :editable="lineSwite"  :path="lineAAR[8].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[9].swite" :editable="lineSwite"  :path="lineAAR[9].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[10].swite" :editable="lineSwite"  :path="lineAAR[10].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[11].swite" :editable="lineSwite"  :path="lineAAR[11].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[12].swite" :editable="lineSwite"  :path="lineAAR[12].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[13].swite" :editable="lineSwite"  :path="lineAAR[13].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
      <el-amap-polyline :visible="lineAAR[14].swite" :editable="lineSwite"  :path="lineAAR[14].line" :strokeColor="'#ff3e4c'"></el-amap-polyline>
    </el-amap>
    <div class="position-box clearfix" @click="toMpos" v-if="setPosition.length >= 1">
      <div class="pos-button pull-left">
        <i class="iconfont icon-local"></i>
      </div>
      <div class="text pull-left">我的位置</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { AMapManager } from 'vue-amap'
  import pdLine from '../line/pd'
  import bsLine from '../line/bs'
  import cnLine from '../line/cn'
  import fxLine from '../line/fx'
  import hkLine from '../line/hk'
  import hpLine from '../line/hp'
  import jdLine from '../line/jd'
  import jnLine from '../line/jn'
  import jsLine from '../line/js'
  import mhLine from '../line/mh'
  import ptLine from '../line/pt'
  import qpLine from '../line/qp'
  import sjLine from '../line/sj'
  import xhLine from '../line/xh'
  import ypLine from '../line/yp'
  let lineArr = [
    {code: '310101', line: hpLine, swite: false},
    {code: '310115', line: pdLine, swite: false},
    {code: '310104', line: xhLine, swite: false},
    {code: '310105', line: cnLine, swite: false},
    {code: '310106', line: jnLine, swite: false},
    {code: '310107', line: ptLine, swite: false},
    {code: '310109', line: hkLine, swite: false},
    {code: '310110', line: ypLine, swite: false},
    {code: '310112', line: mhLine, swite: false},
    {code: '310113', line: bsLine, swite: false},
    {code: '310114', line: jdLine, swite: false},
    {code: '310116', line: jsLine, swite: false},
    {code: '310117', line: sjLine, swite: false},
    {code: '310118', line: qpLine, swite: false},
    {code: '310120', line: fxLine, swite: false}
  ]
  import api from '../api/index'
  let amapManager = new AMapManager()
  const POLYGON_ID = 'POLYGON_ID'
  export default {
    name: 'amap',
    data () {
      return {
        polyline: {
          vid: POLYGON_ID,
          path: [],
          events: {
            click (e) {
              alert('click polyline')
            },
            end: (e) => {
            }
          },
          editable: false
        },
        lineSwite: false,
        lineAAR: [],
        searchSwite: true,
        polygons: [],
        posarrPos: [],
        goPos: [],
        geolocation: '',
        mapObj: '',
        markInner: [
          {
            name: '',
            id: '',
            leve: '',
            latitudeGD: 31.117393,
            longitudeGD: 121.456639
          }
        ],
        Zdom: '',
        Sdom: '',
        Mdom: '',
        toStreet: 14,
        toLaw: 14,
        amapManager: amapManager,
        zooms: [13, 18],
        window: {
          position: [121.5273285, 31.21515044],
          content: 'Hi! I am here!',
          visible: false,
          events: {
            close: () => {
              this.window.visible = false
            }
          }
        },
        mapEvents: {
          // 地图加载完成
          complete: () => {
            let self = this
            // let map = this.amapManager.getMap()
            self.mapObj = new AMap.Map('iCenter')
            this.markInner = this.countryArr
            self.mapObj.plugin('AMap.Geolocation', function () {
              self.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
                convert: true,
                showButton: true,
                buttonPosition: 'RB',
                buttonOffset: new AMap.Pixel(10, 20),
                showMarker: true,
                showCircle: true,
                panToLocation: true,
                zoomToAccuracy: true,
                useNative: true
              })
              self.mapObj.addControl(self.geolocation)
              self.geolocation.getCurrentPosition()
              AMap.event.addListener(self.geolocation, 'complete', onComplete)
              AMap.event.addListener(self.geolocation, 'error', onError)
              // self.geolocation.watchPosition()
            })
            function onError (data) {
              // document.getElementById('tip').innerHTML = '定位失败'
            }
            function onComplete (data) {
              let pos = [data.position.lng, data.position.lat]
              self.AgetSetPosition(pos)
            }
          },
          // 地图层级改变
          zoomchange: () => {
            if (this.Roll) {
              let map = this.amapManager.getMap()
              let position = [
                map.getCenter().lng,
                map.getCenter().lat
              ]
              this.AgetMposition(position)
              this.AgetMzoom(map.getZoom())
              this.Agetzoom(map.getZoom())
              if (this.zoom <= 16) {
                this.window.visible = false
              }
            }
          },
          // 鼠标滚动事件
          mousewheel: () => {
            this.AgetRoll(true)
          },
          // 鼠标抬起
          mouseup: () => {
            this.AgetRoll(true)
          },
          mousemove: () => {
          },
          // 地图平移
          mapmove: () => {
          },
          // 地图平移结束
          moveend: () => {
            if (this.Roll) {
              let map = this.amapManager.getMap()
              let position = [
                map.getCenter().lng,
                map.getCenter().lat
              ]
              this.AgetMposition(position)
              this.AgetMzoom(map.getZoom())
            }
          }
        },
        cityEvents: {
          // 区域点击事件
          click: (e) => {
            this.posarrPos = []
            this.AgetRoll(false)
            let item = e.target.Qi.contentDom.querySelector('.zoneM')
            let lat = item.getAttribute('data-lat')
            let log = item.getAttribute('data-log')
            let pos = [log, lat]
            let code = item.getAttribute('data-code')
            this.AgetMzoneCode(code)
            this.AgetCenter(pos)
            this.AgetMposition(pos)
            this.Agetzoom(14)
            this.AgetMzoom(14)
          },
          // 区域触摸事件
          mouseover: (e) => {
            let item = e.target.Qi.contentDom.querySelector('.zoneM')
            let code = item.getAttribute('data-code')
            let ln = this.lineAAR.length
            for (let i = 0; i < ln; i++) {
              this.lineAAR[i].swite = false
              if (code === this.lineAAR[i].code) {
                this.lineAAR[i].swite = true
              }
            }
          },
          mouseout: (e) => {
            let ln = this.lineAAR.length
            for (let i = 0; i < ln; i++) {
              this.lineAAR[i].swite = false
            }
          }
        },
        strEvent: {
          // 街道事件
          click: (e) => {
            this.posarrPos = []
            this.AgetRoll(false)
            let item = e.target.Qi.contentDom.querySelector('.strM')
            let lat = item.getAttribute('data-lat')
            let log = item.getAttribute('data-log')
            let tc = item.getAttribute('data-code')
            let number = item.getAttribute('data-num')
            let name = item.getAttribute('data-name')
            this.AgetMMDnumber(number)
            this.AgetMstCode(tc)
            let arr = {
              zoneCode: this.MzoneCode,
              typeId: this.MtypeId,
              towncode: tc,
              pageSize: 20,
              page: 1
            }
            this.AgetDLname(name)
            this.AgetDetailList(arr)
            let pos = [log, lat]
            this.AgetCenter(pos)
            // this.AgetMposition(pos)
            this.Agetzoom(15)
            this.AgetMzoom(15)
          }
        },
        detEvent: {
          // 详细事件
          click: (e) => {
            this.AgetRoll(false)
            let item = e.target.Qi.contentDom.querySelector('.dtrM')
            let phone = item.getAttribute('data-phone')
            let name = item.getAttribute('data-name')
            let tagname = item.getAttribute('data-typename')
            let id = item.getAttribute('data-id')
            let address = item.getAttribute('data-addres')
            let lat = item.getAttribute('data-lat')
            let log = item.getAttribute('data-log')
            let arr = {
              item: item,
              phone: phone,
              name: name,
              tagname: tagname,
              id: id,
              address: address,
              log: log,
              lat: lat
            }
            this.card(arr)
            this.Agetzoom(17)
            this.AgetMzoom(17)
          }
        }
      }
    },
    watch: {
      Mposition () {
        let that = this
        AMap.plugin('AMap.Geocoder', function () {
          let geocoder = new AMap.Geocoder({
            city: '021' // 城市，默认：“全国”
          })
          geocoder.getAddress(that.Mposition, function (status, result) {
            if (result.info === 'OK') {
              let nameCode = result.regeocode.addressComponent.district
              if (that.Mzoom > 12 && that.Mzoom < 15) {
                that.AgetArea(nameCode)
              }
              let zc
              if (result.regeocode.addressComponent.adcode === '310151') {
                zc = '310230'
              } else {
                zc = result.regeocode.addressComponent.adcode
              }
              that.AgetMzoneCode(zc)
              if (that.Mzoom > 14) {
                that.AgetArea(nameCode)
                that.AgetDLname(result.regeocode.addressComponent.township)
              }
            }
          })
        })
        if (this.Mzoom > 14) {
          this.AgetRoll(true)
          // console.log('（中心点）该根据经纬度显示机构了')
          this.AgetMstCode('')
          let arr = {
            longitude: this.Mposition[0],
            latitude: this.Mposition[1],
            pageSize: 30,
            typeId: this.MtypeId
          }
          this.AgetDetailListDL(arr)
        }
      },
      Mzoom () {
        let that = this
        AMap.plugin('AMap.Geocoder', function () {
          let geocoder = new AMap.Geocoder({
            city: '021' // 城市，默认：“全国”
          })
          geocoder.getAddress(that.Mposition, function (status, result) {
            if (result.info === 'OK') {
              let zc
              if (result.regeocode.addressComponent.adcode === '310151') {
                zc = '310230'
              } else {
                zc = result.regeocode.addressComponent.adcode
              }
              that.AgetMzoneCode(zc)
            }
          })
        })
        if (this.Mzoom > 12 && this.Mzoom < 15) {
          if (this.MzoneCode !== '') {
            let pram = {
              zoneCode: this.MzoneCode,
              pageSize: -1,
              typeId: this.MtypeId
            }
            this.AgetStreet(pram)
          }
          let ln = this.lineAAR.length
          for (let i = 0; i < ln; i++) {
            this.lineAAR[i].swite = false
            if (this.MzoneCode === this.lineAAR[i].code) {
              this.lineAAR[i].swite = true
            }
          }
          this.AgetDLname('')
          this.AgetMstCode('')
          // console.log('（层级改变）该显示街道了')
          return
        } else if (this.Mzoom > 14) {
          let ln = this.lineAAR.length
          for (let i = 0; i < ln; i++) {
            this.lineAAR[i].swite = false
            if (this.MzoneCode === this.lineAAR[i].code) {
              this.lineAAR[i].swite = true
            }
          }
          // console.log('（层级改变）该根据经纬度显示机构了')
          return
        } else {
          this.AgetDLname('')
          this.AgetMstCode('')
          this.AgetStreetA([])
          this.Aclear()
          this.AgetZoneSwite(true)
          this.AgetStrSwite(false)
          this.AgetDetSwite(false)
          let ln = this.lineAAR.length
          for (let i = 0; i < ln; i++) {
            this.lineAAR[i].swite = false
          }
          // console.log('（层级改变）改恢复区域了')
          return
        }
      },
      MzoneCode () {
        if (this.Mzoom > 12 && this.Mzoom < 15) {
          let ln = this.lineAAR.length
          for (let i = 0; i < ln; i++) {
            this.lineAAR[i].swite = false
            if (this.MzoneCode === this.lineAAR[i].code) {
              this.lineAAR[i].swite = true
            }
          }
          let pram = {
            zoneCode: this.MzoneCode,
            pageSize: -1,
            typeId: this.MtypeId
          }
          this.AgetStreet(pram)
          // console.log('(区域改变)该显示街道了')
        } else if (this.Mzoom > 14) {
          let ln = this.lineAAR.length
          for (let i = 0; i < ln; i++) {
            this.lineAAR[i].swite = false
            if (this.MzoneCode === this.lineAAR[i].code) {
              this.lineAAR[i].swite = true
            }
          }
        } else {
          let ln = this.lineAAR.length
          for (let i = 0; i < ln; i++) {
            this.lineAAR[i].swite = false
          }
        }
      },
      countryArr () {
        this.markInner = this.countryArr
      },
      streetArr () {
        if (this.Mzoom > 12 && this.Mzoom < 15) {
        } else if (this.Mzoom >= 15) {
        } else {
        }
      },
      detailArr () {
        this.AgetRoll(false)
        let item = this.detailArr
        let phone = item.properties.phone
        let name = item.properties.name
        let tagname = item.typeName
        let id = item.id
        let address = item.properties.address
        let lat = item.properties.latitudeGD
        let log = item.properties.longitudeGD
        let arr = {
          item: item,
          phone: phone,
          name: name,
          tagname: tagname,
          id: id,
          address: address,
          log: log,
          lat: lat
        }
        let pos = [log, lat]
        this.AgetCenter(pos)
        this.card(arr)
        this.Agetzoom(17)
        this.AgetMzoom(17)
        setTimeout(() => {
          this.AgetLoginSwite(false)
        }, 1000)
      },
      searchText () {
        let map = this.amapManager.getMap()
        let that = this
        if (this.searchText.length >= 2) {
          map.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
            let autoOptions = {
              city: '上海'
            }
            let auto = new AMap.Autocomplete(autoOptions)
            auto.search(this.searchText, function (e, o) {
              if (o.info === 'OK') {
                if (that.searchText !== '') {
                  let len = o.tips.length
                  let arr = []
                  for (let i = 0; i < len; i++) {
                    if (o.tips[i].location) {
                      arr.push(o.tips[i])
                      if (i === 8) break
                    }
                  }
                  that.AgetDLarr(arr)
                } else {
                  that.AgetDLarr([])
                }
              }
            })
          })
          if (this.searchSwite) {
            let arr = {
              keyWord: this.searchText,
              typeId: this.MtypeId,
              pageSize: 5
            }
            this.searchSwite = false
            api.getGroup(arr).then(json => {
              if (that.searchText !== '') {
                this.AgetSearArr(json.data)
              } else {
                this.AgetSearArr([])
              }
              this.searchSwite = true
            })
          }
        } else {
          this.AgetDLarr([])
          this.AgetSearArr([])
        }
      },
      detailList () {
        if (this.posarrPos.length >= 1) {
          let lnglat = new AMap.LngLat(this.posarrPos[0].location.lng, this.posarrPos[0].location.lat)
          let lg
          let la
          let len = this.detailList.length
          for (let i = 0; i < len; i++) {
            lg = this.detailList[i].properties.longitudeGD ? this.detailList[i].properties.longitudeGD : 0
            la = this.detailList[i].properties.latitudeGD ? this.detailList[i].properties.latitudeGD : 0
            let num
            let count
            if (lg === 0) {
              num = -1
            } else {
              num = parseInt(lnglat.distance([lg, la]))
            }
            if (num >= 1000) {
              count = `${(num / 1000).toFixed(2)} 公里`
            } else if (num < 0) {
              count = ''
            } else {
              count = `${parseInt(num)} 米`
            }
            this.detailList[i].count = count
          }
          return
        } else if (this.setPosition.length >= 1) {
          let lnglat = new AMap.LngLat(this.setPosition[0], this.setPosition[1])
          let lg
          let la
          let len = this.detailList.length
          for (let i = 0; i < len; i++) {
            lg = this.detailList[i].properties.longitudeGD ? this.detailList[i].properties.longitudeGD : 0
            la = this.detailList[i].properties.latitudeGD ? this.detailList[i].properties.latitudeGD : 0
            let num
            let count
            if (lg === 0) {
              num = -1
            } else {
              num = parseInt(lnglat.distance([lg, la]))
            }
            if (num >= 1000) {
              count = `${(num / 1000).toFixed(2)} 公里`
            } else if (num < 0) {
              count = ''
            } else {
              count = `${parseInt(num)} 米`
            }
            this.detailList[i].count = count
          }
          return
        }
      },
      searchWindow () {
      },
      dlposObject () {
        this.goPos = []
        if (this.dlposObject.name) {
          let item = this.dlposObject
          let lat = item.location.lat
          let log = item.location.lng
          let pos = [log, lat]
          this.AgetCenter(pos)
          this.AgetMposition(pos)
          this.Agetzoom(15)
          this.AgetMzoom(15)
          this.posarrPos = []
          this.posarrPos.push(this.dlposObject)
        } else {
          this.posarrPos = []
          this.AgetCenter([121.5273285, 31.21515044])
          this.AgetMposition([121.5273285, 31.21515044])
          this.Agetzoom(12)
          this.AgetMzoom(12)
          this.window.visible = false
        }
      },
      seposObject () {
        this.posarrPos = []
        if (this.seposObject.id) {
          let item = this.seposObject
          let phone = item.properties.phone
          let name = item.properties.name
          let tagname = item.typeName
          let id = item.id
          let address = item.properties.address
          let lat = item.properties.latitudeGD
          let log = item.properties.longitudeGD
          let pos = [log, lat]
          let arr = {
            item: item,
            phone: phone,
            name: name,
            tagname: tagname,
            id: id,
            address: address,
            log: log,
            lat: lat
          }
          this.AgetCenter(pos)
          this.AgetMposition(pos)
          this.card(arr)
          this.Agetzoom(17)
          this.AgetMzoom(17)
        } else {
          this.AgetCenter([121.5273285, 31.21515044])
          this.AgetMposition([121.5273285, 31.21515044])
          this.Agetzoom(12)
          this.AgetMzoom(12)
          this.window.visible = false
        }
      },
      setPosition (newVale) {
      },
      goPos (newVale) {
        if (this.goPos.length >= 1) {
          this.AgetCenter(newVale)
          this.AgetMposition(newVale)
          this.Agetzoom(15)
          this.AgetMzoom(15)
        }
      }
    },
    computed: {
      ...mapGetters([
        'Mzoom',
        'Mposition',
        'countryArr',
        'MzoneCode',
        'MtypeId',
        'center',
        'streetArr',
        'ZoneSwite',
        'StrSwite',
        'DetSwite',
        'detailList',
        'zoom',
        'Roll',
        'detailArr',
        'searchText',
        'dlposObject',
        'seposObject',
        'setPosition'
      ])
    },
    methods: {
      ...mapActions([
        'AgetMzoom',
        'AgetMposition',
        'AgetMMap',
        'AgetMzoneCode',
        'AgetStreet',
        'AgetZoneSwite',
        'AgetStrSwite',
        'AgetDetSwite',
        'AgetDetailListDL',
        'AgetCenter',
        'Agetzoom',
        'AgetRoll',
        'AgetArea',
        'AgetMstCode',
        'AgetDetailList',
        'Aclear',
        'AgetMMnumber',
        'AgetLoginSwite',
        'AgetDLname',
        'AgetDLarr',
        'AgetSearArr',
        'AgetSetPosition',
        'AgetStreetA',
        'AgetcountryA',
        'AgetMMDnumber'
      ]),
      mouseWheel (map) {
      },
      card (item) {
        this.window.visible = true
        this.window.position = [item.log, item.lat]
        // this.center = [item.log, item.lat]
        // console.log(this.center)
        this.window.content = '<div class="card">' +
                              '<div class="card-heading">' +
                              '<div class="tag">' + item.tagname + '</div>' +
                              // '<a class="readmore" href="//12348.justice.gov.cn/sites/12348/detail/subject-detail.jsp?id=' + id + '" target="_blank">了解更多</a>' +
                              '</div>' +
                              '<div class="card-body"> ' +
                              '<div class="title">' +
                                '<span>' + item.name + '</span>' +
                                '<a class="title-a" href="//12348.justice.gov.cn/sites/12348/detail/subject-detail.jsp?id=' + item.id + '" target="_blank">查看详情</a>' +
                              '</div>' +
                              '<ul class="card-filter">' +
                              '<li class="card-item">' +
                              '<div class="count">0</div><div class="text">规模</div>' +
                              '</li>' +
                              '<li class="card-item">' +
                              '<div class="count">0</div><div class="text">公益指数</div>' +
                              '</li>' +
                              '<li class="card-item">' +
                              '<div class="count">0</div><div class="text">信用指数</div>' +
                              '</li>' +
                              '<li class="card-item">' +
                              '<div class="count">0</div><div class="text">好评率</div>' +
                              '</li>' +
                              '</ul>' +
                              '<ul class="card-btns">' +
                              '<li>' +
                              '<a class="card-btn card-btn-1" href="//12348.justice.gov.cn/sites/12348/zxspace/text-detail.jsp?entityId=8969156b86634bc994500b0561e7fa77" target="_blank">我要咨询</a>' +
                              '</li>' +
                              '<li>' +
                              '<a class="card-btn card-btn-2" href="//12348.justice.gov.cn/sites/12348/' + item.serviceLink + '" target="_blank">在线预约</a>' +
                              '</li>' +
                              '<li>' +
                              '<a class="card-btn card-btn-3" href="http://12348.justice.gov.cn/sites/12348/detail/subject-detail.jsp?id=' + item.id + '" target="_blank">信用信息</a>' +
                              '</li>' +
                              '</ul>' +
                              '<div class="tel-phone-box">' +
                              '<div class="tel-phone-title"><i class="iconfont icon-tel"></i>服务电话</div>' +
                              '<div class="tel-phone">' + item.phone + '</div>' +
                              '</div>' +
                              '<div class="desc"><i class="iconfont icon-local"></i>' + item.address + '</div> ' +
                              '</div>' +
                              '</div>'
      },
      clearLine () {
        let l = this.polygons.length
        for (let i = 0; i < l; i++) {
          this.polygons[i].setMap(null)
        }
      },
      toMpos () {
        this.posarrPos = []
        this.goPos = []
        this.goPos = this.setPosition
      }
    },
    created () {
      this.lineAAR = lineArr
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';
  .amap-container {
    width: 100%;
    height: 100%;
  }
  .zoneM {
    position: absolute;
    width: 80px;
    height: 80px;
    padding: 24px 0;
    border-radius: 50%;
    background-color: #ff4240;
    opacity: .9;
    text-align: center;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0,0,0,.5);
  }
  .zoneM:hover {
    opacity: 1;
  }
  .strM {
    position: absolute;
    width: 80px;
    height: 80px;
    padding: 24px 0;
    border-radius: 50%;
    background-color: #348ac7;
    opacity: .9;
    text-align: center;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0,0,0,.5);
  }
  .strM:hover {
    opacity: 1;
  }
  .dtrM {
    .iconfont {
      font-size: 30px;
    }
    &.人民调解委员会 {
      .iconfont {
        color: #090;
      }
    }
    &.律师事务所 {
      .iconfont {
        color: #348ac7;
      }
    }
    &.公证处 {
      .iconfont {
        color: #1ab99b;
      }
    }
    &.法援助机构 {
      .iconfont {
        color: #0fa3b1;
      }
    }
    &.法援 {
      .iconfont {
        color: #0fa3b1;
      }
    }
    &.法律服务所 {
      .iconfont {
        color: #0fa3b1;
      }
    }
    &.司法鉴定所 {
      .iconfont {
        color: #ec4040;
      }
    }
  }
  .dwM {
    width: 25px;
    height: 36px;
    background: url('../../static/images/mark_local.png');
    background-size: 100% 100%;
  }
  .dwMP {
    width: 23px;
    height: 23px;
    background: url('https://webapi.amap.com/theme/v1.3/markers/n/loc.png');
    background-size: 100% 100%;
  }
  .amap-info-content.amap-info-outer {
    padding: 0;
    border-radius: 6px;
    overflow: hidden;
  }
  .amap-info-sharp {
    margin: 0 auto;
    bottom: 1px;
    position: relative;
    background: url(http://webapi.amap.com/theme/v1.3/images/amap-info.png) -5px -564px no-repeat;
    width: 18px;
    height: 9px;
  }
  .card {
    overflow: hidden;
    position: relative;
    width: 350px;
    border-radius: 5px 5px 0 0;
    .card-heading {
      width: 100%;
      height: 124px;
      text-align: center;
      background: url(../../static/images/card-bg.png) center top no-repeat;
      background-size: 100% auto;
    }
    .card-body {
      padding-bottom: 10px;
    }
    .tag {
      position: absolute;
      top: 13px;
      left: 0;
      display: inline-block;
      padding-left: 10px;
      padding-right: 10px;
      height: 26px;
      line-height: 24px;
      border-top: 1px solid rgba($white,.25);
      border-bottom: 1px solid rgba($white,.25);
      color: white;
      background-color: rgba($white,.2);
      &:after {
        content: '';
        position: absolute;
        right: -7px;
        top: -1px;
        width: 7px;
        height: 26px;
        background: url(../../static/images/tag-bg.png) top left no-repeat;
      }
    }
    .readmore {
      display: inline-block;
      margin: 55px auto 35px auto;
      padding: 5px 15px;
      font-size: $font-size-large;
      border-radius: 3px;
      border: 1px solid rgba($white,.2);
      font-weight: 100;
      color: $white;
      background-color: rgba($white,.1);
      transition: all .18s ease-in;
      &:hover {
        box-shadow: 0 0 50px rgba(0,0,0,.08);
      }
    }
    .title {
      margin-bottom: 10px;
      padding: 10px 15px;
      font-size: $font-size-h4;
      border-bottom: 1px solid $gray-lighter;
      font-weight: bolder;
      color: $gray-dark;
      background-color: #f8f8f8;
      span {
        width: 80%;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .title-a {
        display: inline-block;
        height: 100%;
        margin-top: 5px;
        float: right;
        font-size: 13px;
      }
    }
    .desc {
      position: relative;
      padding-left: 35px;
      padding-right: 15px;
      line-height: 100%;
      font-size: 15px;
      color: $gray-light;
      .iconfont {
        position: absolute;
        left: 15px;
        top: 1px;
        color: $brand-blue;
      }
    }
    .card-filter {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
      display: none;
      .card-item {
        float: left;
        width: 25%;
        text-align: center;
        border-right: 1px solid #e6e5ea;
      }
      .count {
        font-size: 20px;
        color: #15bb7e;
      }
      .text {
        font-size: 12px;
        color: #888;
      }
    }
    .card-btns {
      margin: 0;
      padding: 18px;
      list-style: none;
      overflow: hidden;
      display: none;
      li {
        float: left;
        margin-left: 10px;
        &:first-child {
          margin-left: 0;
        }
      }
      .card-btn {
        display: block;
        width: 90px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border-radius: 6px;
        font-size: 12px;
        color: $white;
        &.card-btn-1 {
          background-color: #3387ce;
        }
        &.card-btn-2 {
          background-color: #2db694;
        }
        &.card-btn-3 {
          background-color: #dc772c;
        }
      }
    }
    .tel-phone-box {
      position: relative;
      padding: 0 18px;
      margin-top: 20px;
      margin-bottom: 18px;
    }
    .tel-phone {
      position: relative;
      padding: 10px 0 8px;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid #c2cad7;
      box-sizing: border-box;
      font-size: 28px;
      color: #51638a;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .tel-phone-title {
      position: absolute;
      left: 50%;
      top: -10px;
      padding: 0 14px;
      transform: translate(-50%, 0);
      background-color: $white;
      font-size: 12px;
      color: #51638a;
      z-index: 888888;
      .iconfont {
        margin-right: 8px;
      }
    }
  }
  .position-box {
    position: absolute;
    left: 30px;
    bottom: 40px;
    height: auto;
    line-height: 100%;
    z-index: 888888888;
    cursor: pointer;
    .pos-button {
      position: relative;
      background: #fff;
      width: 35px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border: 1px solid #ccc;
      border-radius: 3px;
      display: inline-block;
      i {
        font-size: 20px;
      }
    }
    .text {
      height: 35px;
      margin-left: 10px;
      line-height: 35px;
      font-size: 16px;
      color: #333;
    }
  }
</style>
