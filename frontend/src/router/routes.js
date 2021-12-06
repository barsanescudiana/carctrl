
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/schedule',
    component: () => import('layouts/FormLayout'),
    children: [
      { path: '', component: () => import('pages/Schedule.vue') }
    ]
  },
    {
    path: '/map/:open', 
    name: 'map',
    component: () => import('layouts/FormLayout'),
    children: [
      { path: '', component: () => import('pages/Maps.vue') }
    ]
  },
    {
    path: '/cars',
    component: () => import('layouts/FormLayout'),
    children: [
      { path: '', component: () => import('pages/Cars.vue') },
    ]
  },
  { path: '/cars/add', 
    component: () => import('layouts/FormLayout'),
  children: [
    { path: 'first', component: () => import('pages/FirstAdd')},
    { path: 'second', component: () => import('pages/SecondAdd')},
    { path: 'success', component: () => import('pages/Success')}

  ]},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
