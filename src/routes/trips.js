export default [
  {
    path: '/trips',
    name: 'trips',
    meta: {
      loadState: true,
      auth: true,
      isAuthPage: false,
      permissions: []
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "users" */ '../views/trips/Index')
  }
];
