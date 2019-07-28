export default [
  {
    path: '*',
    meta: {
      loadState: true,
      auth: false,
      isAuthPage: false,
    },
    component: () => import('../views/NotFound'),
  }
];
