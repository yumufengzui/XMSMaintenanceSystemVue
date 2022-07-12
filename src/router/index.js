import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/:catchAll(.*)",
    component: () => import('../views/notFound/404.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginPage/Login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('../views/home/Home.vue'),
    children:[{
      path: "/generalDocuments",
      name: "generalDocuments",
      meta: {
        title: '一般证件'
      },
      component: () => import ("../views/normalSetting/generalDocuments.vue")
    },
    {
      path: "/codeVisa",
      name: "codeVisa",
      meta: {
        title: '签证代码'
      },
      component: () => import ("../views/normalSetting/codeVisa.vue")
    },
    {
      path: "/visaAuthority",
      name: "visaAuthority",
      meta: {
        title: '签证机关'
      },
      component: () => import ("../views/normalSetting/visaAuthority.vue")
    },
    {
      path: "/shiftCode",
      name: "shiftCode",
      meta: {
        title: '班别代码'
      },
      component: () => import ("../views/normalSetting/shiftCode.vue")
    }
  ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
