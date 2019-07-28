<template>
  <div
    data-component-group="header-layout"
    data-component="auth"
  >
    <Header logo-pos="center center">
      <AuthTabs />
    </Header>
  </div>
</template>

<script>
  import Header from './Header';
  import AuthTabs from '../../tabs/Auth';

  export default {
    components: {
      Header,
      AuthTabs
    },
    data() {
      return {
        langBoxPos: {
          top: 10,
          right: 10
        }
      };
    }
  };
</script>
