import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

let apiResource = Vue.axios.create({
  method: 'get',
  baseURL: 'http://12348.justice.gov.cn/service/rest/orgstruct.Map/collection'
})

export default {
  getDistrict: (opts) => {
    return apiResource({url: 'mapgroupdata?', params: { ...opts }})
  },
  getGroup: (opts) => {
    return apiResource({url: 'mapdata?', params: { ...opts }})
  },
  getGroupTypes: (opts) => {
    return apiResource({url: 'mapgrouptype', params: { ...opts }})
  },
  getLocation: (opts) => {
    return apiResource({url: 'orgnearby?', params: { ...opts }})
  }
}
