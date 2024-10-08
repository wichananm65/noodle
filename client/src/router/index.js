import Vue from 'vue'
import Router from 'vue-router'

import NoodleIndex from '@/components/Noodles/Index'
import NoodleCreate from '@/components/Noodles/CreateNoodle'
import NoodleEdit from '@/components/Noodles/EditNoodle'
import NoodleShow from '@/components/Noodles/ShowNoodle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/noodles',
      name: 'noodles',
      component: NoodleIndex
    },
    {
      path: '/noodle/create',
      name: 'noodle-create',
      component: NoodleCreate
    },
    {
      path: '/noodle/edit',
      name: 'noodle-edit',
      component: NoodleEdit
    },
    {
      path: '/noodle',
      name: 'noodle',
      component: NoodleShow
    }
  ]
})
