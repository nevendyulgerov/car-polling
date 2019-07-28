export default [{
  name: 'login',
  icon: 'account_circle',
  label: 'Login',
  paths: ['/login', '/password'],
  redirect: '/login',
  isSelected: true
}, {
  name: 'register',
  icon: 'edit',
  label: 'Register',
  paths: ['/register'],
  redirect: '/register',
  isSelected: false
}];
