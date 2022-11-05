export default [
  {
    path: '/admin/cities',
    name: 'admin-cities',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-cities" */ '@/components/AdminCities.vue'
      )
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminUsers.vue'
      )
  },
  {
    path: '/admin/reports',
    name: 'reports',
    meta: {
      requiresAuth: false
    },
    component: () => import('@/components/Reports.vue')
  }
]
