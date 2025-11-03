import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
        path: '/',
        redirect: '/main/index'
      },
      {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/index.vue'),
      },{
          path: '/register',
          name: 'register',
          component: () => import('@/views/register/index.vue'),
      }, {
          path: '/reset',
          name: 'reset',
          component: () => import('@/views/resetPassword/index.vue'),
      },{
          path: '/',
          name: 'main',
          component: () => import('@/views/main/index.vue'),
          children: [
              {
                  path: 'index',
                  name: 'index',
                  component: () => import('@/views/main/index.vue'),
              }
          ]
      }
  ]
})

export default router
