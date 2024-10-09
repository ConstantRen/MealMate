<template>
  <div>
    <h1>Login</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
