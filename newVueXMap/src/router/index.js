import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'

// import Country from '@/components/country'// 区县列表组件
// import Street from '@/components/street'// 街道
// import ListDetail from '@/components/list-detail'// 详细列表

// 判断是否为浏览器环境
Router.prototype.isWindow = (global === window)
Router.prototype.goBack = function () {
  this.isBack = true
  if (window.history.length <= 2) {
    window.location.href = '#/'
  } else {
    window.history.go(-1)
  }
}

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  }
]

export default new Router({
  linkActiveClass: 'active',
  routes
})
