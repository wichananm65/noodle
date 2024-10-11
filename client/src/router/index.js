import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import NoodleIndex from '@/components/Noodles/index'
import NoodleAdd from '@/components/Noodles/AddNoodle'
import NoodleShow from '@/components/Noodles/ShowNoodle'
import NoodleEdit from '@/components/Noodles/EditNoodle'

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/noodles',
      name: 'noodles',
      component: NoodleIndex
    },
    {
      path: '/noodle/add',
      name: 'noodle-add',
      component: NoodleAdd
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
