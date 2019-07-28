export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      loadState: true,
      auth: false,
      isAuthPage: true,
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login'),
  }
];
