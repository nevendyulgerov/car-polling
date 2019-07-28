export default [
  {
    path: '/register',
    name: 'register',
    meta: {
      loadState: true,
      auth: false,
      isAuthPage: true,
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register')
  }
];
