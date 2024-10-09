<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('userId', response.data.uid); // Store user ID
        this.$router.push('/'); // Redirect to home page after login
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
    },
  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
