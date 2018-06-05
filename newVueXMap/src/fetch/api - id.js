import axios from 'axios'

const URL = 'http://12348.justice.gov.cn/service/rest/dm.DataService/zx.LegalServiceCenter@mapview/invoke?'

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
  getidPos (param) {
    return fetch(`entityId=${param}`)
  }
}
