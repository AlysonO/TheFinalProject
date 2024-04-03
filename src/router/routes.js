
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'manages', component: () => import('pages/ManagesPage.vue') },
      { path: 'entretiens', component: () => import('pages/EntretienPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
