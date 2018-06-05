import api from '../../api/index'
import Router from 'vue-router'
let RTswite = Router.prototype.isWindow
const state = {
  area: '上海市',
  MMnumber: 0,
  MMSnumber: 0,
  MMDnumber: 0,
  center: [121.472644, 31.231706],
  zoom: 12,
  stract: [],
  routSwit: false,
  countryArr: [],
  streetArr: [],
  detailList: [],
  detailArr: {},
  MMap: '',
  Mzoom: [],
  MtypeId: '1309ace1040f457cb27f48d3b66e13cf',
  Mposition: [],
  setPosition: [],
  typename: [
    {id: '7454a420f4ef4e539c1b9b4e30e8f6e7', name: '人民调解委员会'},
    {id: 'cf2ec647762641e897c0d1fd7f474141', name: '律师事务所'},
    {id: 'f2c12d3fe56845c79154dea5a90c8bb1', name: '公证处'},
    {id: 'bf6f10555f54425483df978649473325', name: '法援助机构'},
    {id: '6943237e1b2948afb6625abd7f86ac7e', name: '司法鉴定'}
  ],
  nameToType: '',
  MzoneCode: '',
  MstCode: '',
  ZoneSwite: true,
  StrSwite: false,
  DetSwite: false,
  Roll: true,
  loginSwite: true,
  DLname: '',
  pageNumber: 1,
  searchText: '',
  DLarr: [],
  searArr: [],
  LSarr: [],
  dlposObject: {},
  seposObject: {},
  jgName: '机构类型'
}

const getters = {
  routSwit: state => state.routSwit, // 路由切换开关
  area: state => state.area, // 名称地址
  center: state => state.center,
  MMnumber: state => state.MMnumber, // 机构数量
  MMSnumber: state => state.MMSnumber, // 机构数量 (街道)
  MMDnumber: state => state.MMDnumber, // 机构数量 (详细)
  stract: state => {
    return state.stract.filter(stract => stract.level !== 'City')
  },
  nameToType: state => state.nameToType, // 机构类型名称
  countryArr: state => state.countryArr, // 区县列表
  streetArr: state => state.streetArr, // 街道列表
  detailList: state => state.detailList, // 详细列表
  detailArr: state => state.detailArr, // 详细机构
  Mzoom: state => state.Mzoom, // 地图当前层级
  Mposition: state => state.Mposition, // 地图当前中心点坐标
  setPosition: state => state.setPosition, // 定位当前位置
  MzoneCode: state => state.MzoneCode, // 区域ID
  MstCode: state => state.MstCode, // 街道ID
  MtypeId: state => state.MtypeId, // 类型
  ZoneSwite: state => state.ZoneSwite, // 区域开关
  StrSwite: state => state.StrSwite, // 街道开关
  DetSwite: state => state.DetSwite, // 详情开关
  typename: state => state.typename, // 机构类型
  zoom: state => state.zoom, // 地图层级
  Roll: state => state.Roll, // 是否为点击事件
  loginSwite: state => state.loginSwite, // 加载动画
  DLname: state => state.DLname, // 地理名称
  pageNumber: state => state.pageNumber, // 翻页
  searchText: state => state.searchText, // 搜索
  DLarr: state => state.DLarr, // 地理数组
  searArr: state => state.searArr, // 搜索数组
  LSarr: state => state.LSarr, // 历史纪录数组
  dlposObject: state => state.dlposObject, // 地图用渲染（地理）
  seposObject: state => state.seposObject, // 地图用渲染
  jgName: state => state.jgName // 机构toolbar名字
}

const actions = {
  // 路由切换的效果
  AroutFun ({commit}, inner) {
    commit('routFun', inner)
  },
  // 初始化
  Acountyr ({commit}, inner) {
    commit('getLoginSwite', true)
    api.getDistrict(inner).then(res => {
      let len = res.data.length
      let num = 0
      for (let i = 0; i < len; i++) {
        num += res.data[i].count
      }
      commit('getMMnumber', num)
      commit('getCountry', res.data)
      commit('getLoginSwite', false)
    })
  },
  // 直接初始
  AgetcountryA ({commit}, inner) {
    commit('getCountry', inner)
  },
  // 添加街道
  AgetStreet ({commit}, inner) {
    commit('getLoginSwite', true)
    api.getDistrict(inner).then(json => {
      let len = json.data.length
      let num = 0
      for (let i = 0; i < len; i++) {
        num += json.data[i].count
      }
      commit('getMMSnumber', num)
      if (state.Mzoom > 12 && state.Mzoom < 15) {
        commit('getZoneSwite', false)
        commit('getStrSwite', true)
        commit('getDetSwite', false)
        commit('getStreet', json)
        commit('getLoginSwite', false)
      }
    })
  },
  // 直接添加街道
  AgetStreetA ({commit}, inner) {
    commit('getStreet', inner)
  },
  // 添加详细列表(地理)
  AgetDetailListDL ({commit}, inner) {
    commit('getLoginSwite', true)
    api.getLocation(inner).then(json => {
      if (state.Mzoom > 14) {
        let number = json.data.length
        commit('getMMDnumber', number)
        commit('getZoneSwite', false)
        commit('getStrSwite', false)
        commit('getDetSwite', true)
        commit('getDetailList', json)
        commit('getLoginSwite', false)
      }
    })
  },
  // 添加详细列表(行政级)
  AgetDetailList ({commit}, inner) {
    commit('getLoginSwite', true)
    api.getGroup(inner).then(json => {
      if (state.Mzoom > 14) {
        commit('getZoneSwite', false)
        commit('getStrSwite', false)
        commit('getDetSwite', true)
        commit('getDetailList', json)
        setTimeout(() => {
          commit('getRoll', true)
        }, 1000)
        if (json.data[0]) {
          let lat = json.data[0].properties.latitudeGD
          let log = json.data[0].properties.longitude
          let position = [log, lat]
          commit('getCenter', position)
          commit('getLoginSwite', false)
        }
      }
    })
  },
  // 添加详细列表(机构筛选)
  AgetDetailListS ({commit}, inner) {
    commit('getLoginSwite', true)
    api.getGroup(inner).then(json => {
      if (state.Mzoom > 14) {
        let number = json.data.length
        commit('getZoneSwite', false)
        commit('getStrSwite', false)
        commit('getDetSwite', true)
        commit('getDetailList', json)
        commit('getMMDnumber', number)
        setTimeout(() => {
          commit('getRoll', true)
        }, 1000)
        if (json.data[0]) {
          let lat = json.data[0].properties.latitudeGD
          let log = json.data[0].properties.longitude
          let position = [log, lat]
          commit('getCenter', position)
          commit('getLoginSwite', false)
        }
      }
    })
  },
  // 添加街道地址
  AstreetHref ({commit}) {
    let href = `mapgroupdata?pageSize=-1&`
    if (RTswite) {
      window.location.href = `#index/street?${href}`
    }
  },
  // 改变当前层级
  AgetMzoom ({commit}, inner) {
    commit('getMzoom', inner)
  },
  // 改变当前中心点坐标
  AgetMposition ({commit}, inner) {
    commit('getMposition', inner)
  },
  // 获取地图实例
  AgetMMap ({commit}, inner) {
    commit('getMMap', inner)
  },
  // 获取当前区域code
  AgetMzoneCode ({commit}, inner) {
    commit('getMzoneCode', inner)
  },
  // 获取当前街道code
  AgetMstCode ({commit}, inner) {
    commit('getMstCode', inner)
  },
  // 获取当前机构类型
  AgetMtypeId ({commit}, inner) {
    commit('getMtypeId', inner)
  },
  // 获取机构总数
  AgetMMnumber ({commit}, inner) {
    commit('getMMnumber', inner)
  },
  // 街道机构数
  AgetMMSnumber ({commit}, inner) {
    commit('getMMSnumber', inner)
  },
  // 详细机构数
  AgetMMDnumber ({commit}, inner) {
    commit('getMMDnumber', inner)
  },
  // 区域开关
  AgetZoneSwite ({commit}, inner) {
    commit('getZoneSwite', inner)
  },
  // 街道开关
  AgetStrSwite ({commit}, inner) {
    commit('getStrSwite', inner)
  },
  // 详细列表开关
  AgetDetSwite ({commit}, inner) {
    commit('getDetSwite', inner)
  },
  // 改变定位
  AgetCenter ({commit}, inner) {
    commit('getCenter', inner)
  },
  // 地图层级
  Agetzoom ({commit}, inner) {
    commit('getzoom', inner)
  },
  // 是否滚动加载
  AgetRoll ({commit}, inner) {
    commit('getRoll', inner)
  },
  // 地理名称
  AgetArea ({commit}, inner) {
    commit('getArea', inner)
  },
  // 总清除
  Aclear ({commit}, inner) {
    // commit('getMtypeId', '1309ace1040f457cb27f48d3b66e13cf') // typeid
    commit('getMzoneCode', '') // 区域类型
    commit('getMstCode', '') // 街道
    commit('getArea', '上海市')
  },
  // 加载动画
  AgetLoginSwite ({commit}, inner) {
    commit('getLoginSwite', inner)
  },
  // 获取详细地理位置
  AgetDLname ({commit}, inner) {
    commit('getDLname', inner)
  },
  // 获取详细机构
  AgetDetailArr ({commit}, inner) {
    commit('getDetailArr', inner)
  },
  // 翻页
  AgetPageNumber ({commit}, inner) {
    commit('getPageNumber', inner)
  },
  // 搜索内容
  AgetSearchText ({commit}, inner) {
    commit('getSearchText', inner)
  },
  // 地理数组
  AgetDLarr ({commit}, inner) {
    commit('getDLarr', inner)
  },
  // 搜索数组
  AgetSearArr ({commit}, inner) {
    commit('getSearArr', inner)
  },
  // 历史纪录数组
  AgetLSarr ({commit}, inner) {
    commit('getLSarr', inner)
  },
  // 地图用渲染（地理）
  AgetdlposObject ({commit}, inner) {
    commit('getdlposObject', inner)
  },
  // 地图用渲染
  AgetseposObject ({commit}, inner) {
    commit('getseposObject', inner)
  },
  // 获取当前定位
  AgetSetPosition ({commit}, inner) {
    commit('getSetPosition', inner)
  },
  // 列表机构类型名称
  AgetNameToType ({commit}, inner) {
    commit('getNameToType', inner)
  },
  // 改变机构名称
  AgetjgName ({commit}, inner) {
    commit('getjgName', inner)
  }
}

const mutations = {
  // 路由切换的效果
  routFun (state, inner) {
    state.routSwit = inner
  },
  // 初始化
  getCountry (state, inner) {
    state.countryArr = []
    state.countryArr = inner
  },
  // 去街道
  getStreet (state, inner) {
    state.streetArr = []
    state.streetArr = inner.data
  },
  // 获取当前层级
  getMzoom (state, inner) {
    state.Mzoom = []
    state.Mzoom = inner
  },
  // 获取当前中心点坐标
  getMposition (state, inner) {
    state.Mposition = []
    state.Mposition = inner
  },
  // 获取地图实例
  getMMap (state, inner) {
    state.MMap = []
    state.MMap = inner
  },
  // 获取当前区域code
  getMzoneCode (state, inner) {
    state.MzoneCode = ''
    state.MzoneCode = inner
  },
  // 获取当前街道
  getMstCode (state, inner) {
    state.MstCode = ''
    state.MstCode = inner
  },
  // 获取当前类型
  getMtypeId (state, inner) {
    state.MtypeId = '1309ace1040f457cb27f48d3b66e13cf'
    state.MtypeId = inner
  },
  // 获取机构总数
  getMMnumber (state, inner) {
    state.MMnumber = 0
    state.MMnumber = inner
  },
  // 街道机构数
  getMMSnumber (state, inner) {
    state.MMSnumber = 0
    state.MMSnumber = inner
  },
  // 详细机构数
  getMMDnumber (state, inner) {
    state.MMDnumber = 0
    state.MMDnumber = inner
  },
  // 区域开关
  getZoneSwite (state, inner) {
    state.ZoneSwite = inner
  },
  // 街道开关
  getStrSwite (state, inner) {
    state.StrSwite = inner
  },
  // 详细列表开关
  getDetSwite (state, inner) {
    state.DetSwite = inner
  },
  // 搜索详细机构列表
  getDetailList (state, inner) {
    state.detailList = []
    state.detailList = inner.data
  },
  // 改变定位
  getCenter (state, inner) {
    state.center = inner
  },
  // 地图层级
  getzoom (state, inner) {
    state.zoom = inner
  },
  // 是否地图控制加载
  getRoll (state, inner) {
    state.Roll = inner
  },
  // 地理名称
  getArea (state, inner) {
    state.area = ''
    state.area = inner
  },
  // 加载动画
  getLoginSwite (state, inner) {
    state.loginSwite = inner
  },
  // 地理详细名称
  getDLname (state, inner) {
    state.DLname = ''
    state.DLname = inner
  },
  // 详细机构
  getDetailArr (state, inner) {
    state.detailArr = {}
    state.detailArr = inner
  },
  // 翻页
  getPageNumber (state, inner) {
    state.pageNumber = inner
  },
  // 搜索内容
  getSearchText (state, inner) {
    state.searchText = ''
    state.searchText = inner
  },
  // 地理数组
  getDLarr (state, inner) {
    state.DLarr = []
    state.DLarr = inner
  },
  // 搜索数组
  getSearArr (state, inner) {
    state.searArr = []
    state.searArr = inner
  },
  // 历史纪录数组
  getLSarr (state, inner) {
    state.LSarr = []
    state.LSarr = inner
  },
  // 地图用渲染(地理)
  getdlposObject (state, inner) {
    state.dlposObject = {}
    state.dlposObject = inner
  },
  // 地图用渲染
  getseposObject (state, inner) {
    state.seposObject = {}
    state.seposObject = inner
  },
  // 获取当前定位
  getSetPosition (state, inner) {
    state.setPosition = []
    state.setPosition = inner
  },
  // 列表机构类型名称
  getNameToType (state, inner) {
    state.nameToType = ''
    state.nameToType = inner
  },
  // 改变机构名称
  getjgName (state, inner) {
    state.jgName = ''
    state.jgName = inner
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
