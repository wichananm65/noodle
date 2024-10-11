import Vue from 'vue'
import Router from 'vue-router'

import CommentIndex from '@/components/Comments/index' 

import NoodleIndex from '@/components/Noodles/index'
import NoodleCreate from '@/components/Noodles/CreateNoodle'
import NoodleShow from '@/components/Noodles/ShowNoodle'
import NoodleEdit from '@/components/Noodles/EditNoodle'

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/noodle/edit/:noodleId',
      name: 'noodle-edit',
      component: NoodleEdit
    },
    {
      path: '/noodle/:noodleId',
      name: 'noodle',
      component: NoodleShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
  ]
})
