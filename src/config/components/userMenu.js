export default [{
  name: 'settings',
  icon: 'settings',
  label: 'Settings',
  paths: [],
  permissions: [{
    subject: 'user',
    actions: ['settings']
  }],
  redirect: undefined,
  isSelected: false
}, {
  name: 'logout',
  icon: 'exit_to_app',
  label: 'Logout',
  paths: [],
  redirect: undefined,
  isSelected: false
}];
