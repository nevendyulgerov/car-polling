export default [
  {
    path: '/users',
    name: 'users',
    meta: {
      loadState: true,
      auth: true,
      isAuthPage: false,
      permissions: [{
        subject: 'user',
        actions: ['view-nav-link', 'view']
      }]
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "users" */ '../views/users/Index')
  }
];
