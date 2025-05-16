import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/games',
    name: 'GameList',
    component: () => import('../views/GameList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/games/gomoku',
    name: 'Gomoku',
    component: () => import('../views/Gomoku.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/games/math',
    name: 'MathGame',
    component: () => import('../views/MathGame.vue'),
    meta: { requiresAuth: true }
  },
    // 贪吃蛇游戏
  {
    path: '/games/snake',
    name: 'Snake',
    component: () => import('../views/SnakeGame.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router