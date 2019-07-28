export default [
  {
    path: '/beers',
    name: 'beers',
    meta: {
      loadState: true,
      auth: false,
      isAuthPage: false,
      permissions: []
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "users" */ '../views/beers/Index')
  }
];
