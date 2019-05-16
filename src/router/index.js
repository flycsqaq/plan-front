import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/plan',
      name: '计划',
      component: () => import('@/views/plan/index.vue'),
      beforeEnter: guards.plan
    },
    {
      path: '/book',
      name: '阅读',
      component: () => import('@/views/book/index.vue'),
      beforeEnter: guards.bookarticle
    },
    {
      path: '/article',
      name: '文章',
      component: () => import('@/components//middle.vue'),
      redirect: '/article/',
      beforeEnter: guards.bookarticle,
      children: [
        {
          hidden: true,
          path: '',
          name: '文章缩略',
          component: () => import('@/views/article/show.vue')
        },
        {
          hidden: true,
          path: 'add/:id',
          name: '文章添加',
          component: () => import('@/views/article/add.vue'),
          props: true,
          beforeEnter: guards.verToken
        },
        {
          hidden: true,
          path: 'add',
          name: '文章添加default',
          component: () => import('@/views/article/add.vue'),
          props: true,
          beforeEnter: guards.verToken
        },
        {
          hidden: true,
          path: ':id',
          name: '文章展示',
          component: () => import('@/views/article/single.vue'),
          props: true
        }
      ]
    },
    {
      path: '/element',
      name: '组件',
      component: () => import('@/components//middle.vue'),
      children: [
        {
          path: 'switch',
          name: '开关',
          component: () => import('@/views/demonstration/switch.vue')
        },
        {
          path: 'dialog',
          name: '对话框',
          component: () => import('@/views/demonstration/dialog.vue')
        },
        {
          path: 'alert',
          name: '弹框',
          component: () => import('@/views/demonstration/alert.vue')
        },
        {
          path: 'pagination',
          name: '分页器',
          component: () => import('@/views/demonstration/pagination.vue')
        },
        {
          path: 'paper',
          name: '纸片',
          component: () => import('@/views/demonstration/paper.vue')
        },
        {
          path: 'colorChange',
          name: '改变风格',
          component: () => import('@/components/colorChange.vue')
        }
      ]
    },
    {
      path: '/plug-in',
      name: '插件',
      component: () => import('@/components//middle.vue'),
      children: [
        {
          path: 'lazyLoad',
          name: '懒加载',
          component: () => import('@/views/plugIn/lazyLoad.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'index',
      hidden: true,
      redirect: '/plan'
    }
  ]
})

router.beforeEach(guards.user)

export default router
