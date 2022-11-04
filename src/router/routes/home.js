export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/Home.vue')
  }
]
