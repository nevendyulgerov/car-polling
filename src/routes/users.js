export default [
  {
    path: '/users',
    name: 'users',
    meta: {
      loadState: true,
      auth: true,
      isAuthPage: false,
      permissions: []
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "users" */ '../views/users/Index')
  },
  {
    path: '/users/:id/profile',
    name: 'profile',
    meta: {
      loadState: true,
      auth: true,
      isAuthPage: false,
      permissions: []
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "profile" */ '../views/users/Profile')
  }
];
