import Vue from 'vue'
import Router from 'vue-router'
import WikiViewer from '@/components/WikiViewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WikiViewer',
      component: WikiViewer
    }
  ]
})
