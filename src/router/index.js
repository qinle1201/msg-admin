import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  // 登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login'),
    meta: { title: '登录' }
  },

  // 主页面
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home'),
    redirect: '/home/welcome',
    meta: { title: '主页' },
    children: [
      {
        path: '/home/welcome',
        name: 'Welcome',
        component: () => import('../views/home/welcome'),
        meta: { title: '首页' }
      },
      {
        path: '/home/advertising',
        component: () => import('../views/advertising'),
        meta: { title: '广告管理' },
        name: 'Advertising',
      }
    ]
  },

  // 博客管理
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/home'),
    redirect: '/blog/article',
    meta: { title: "博客管理" },
    children: [
      {
        path: "/blog/article",
        meta: { title: "文章管理" },
        component: () => import('../views/blog/article')
      },
      {
        path: "/blog/classify",
        meta: { title: "分类管理" },
        component: () => import('../views/blog/classify')
      },
      {
        path: "/blog/label",
        meta: { title: "标签管理" },
        component: () => import('../views/blog/label')
      },

    ]
  },
  
  // 系统管理
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/home'),
    children: [
      {
        path: '/system/user',
        name: 'User',
        component: () => import('../views/system/user'),
        meta: { title: '用户管理' }
      },
      {
        path: '/system/role',
        name: 'Role',
        component: () => import('../views/system/role'),
        meta: { title: '角色管理' }
      },
      {
        path: '/system/menu',
        name: 'Menu',
        component: () => import('../views/system/menu'),
        meta: { title: '菜单管理' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
