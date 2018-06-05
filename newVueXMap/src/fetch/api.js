import axios from 'axios'

const URL = 'http://12348.justice.gov.cn/service/rest/orgstruct.Map/collection/'

export function fetch (url, method = 'GET') {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: URL + url
    })
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export default {
  getGroup (param) {
    return fetch(param)
  },
  // 获取区县
  getCountry (param) {
    return fetch(`mapgroupdata?pageSize=-1`)
  },
  getStreet (param) {
    return fetch(param)
  }
}
