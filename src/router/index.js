import Vue from 'vue'
import Router from 'vue-router'
import todo from '@/pages/todo'
import settings from '@/pages/settings'
import reporting from '@/pages/reporting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo',
      component: todo
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/reporting',
      name: 'reporting',
      component: reporting
    }
  ]
})
