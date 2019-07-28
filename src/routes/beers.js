export default [
  {
    path: '/beers',
    name: 'beers',
    meta: {
      loadState: true,
      auth: true,
      isAuthPage: false,
      permissions: []
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "users" */ '../views/beers/Index')
  }
];
