const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'), // Using LoginLayout to wrap LoginPage
    children: [
      { path: '', redirect: '/login'},
      { path: 'login', component: () => import('pages/LoginPage.vue') }]
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/app/dashboard' }, // Default redirect to dashboard
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'manages',
        component: () => import('pages/ManagesPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'entretiens',
        component: () => import('pages/EntretienPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { requiresAuth: false }
  }
]

export default routes
