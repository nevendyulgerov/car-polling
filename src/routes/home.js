export default [
  {
    path: '/',
    name: 'index',
    meta: {
      loadState: true,
      auth: true,
      isAuthPage: false,
      breadcrumb: 'Home'
    },
    component: () => import('../views/Index')
  }
];
